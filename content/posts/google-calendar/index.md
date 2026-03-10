---
title: Generate a School Calendar with Python and Google Calendar API
description: 'Learn how to automate the creation of recurring school calendar events using Python, pandas, and the Google Calendar API — turning an Excel spreadsheet into a fully populated calendar in seconds.'
featured: false
date: 2026-03-09
slug: /blog/google-calendar/
tags:
  - python
  - automation
  - google-calendar
  - api
  - scripting
repo: 'https://github.com/afreisinger/school-calendar-google'
---

## The Problem

Creating a school calendar manually — with dozens of subjects, time slots, and weekly recurrences — is tedious and error-prone. With a small Python script, you can generate the entire calendar automatically from an Excel file.

In this article we'll walk through how to automate recurring event creation using the Google Calendar API.

Imagine you have a school schedule like this:

| Subject      | Module | Day | Techear |
| ------------ | ------ | --- | ------- |
| Math         | 1      | MO  | Pérez   |
| Math         | 2      | MO  | Pérez   |
| English      | 3      | TU  | Smith   |
| Language     | 4      | WE  | García  |
| Science      | 5      | TH  | Johnson |
| History      | 6      | FR  | Lee     |
| Art          | 7      | FR  | Davis   |
| Physical Ed. | 8      | MO  | Taylor  |

Each class has:

- A day of the week
- A time slot (module number)
- A subject name
- A teacher
- A weekly recurrence throughout the school year

Entering all of this by hand into Google Calendar — for every subject, every teacher, every week — can easily take hours. There's also a high chance of typos or duplicate entries. Automating it eliminates both problems.

## The Solution

The approach is straightforward:

1. Store the schedule in an Excel file
2. Read it with **pandas**
3. Convert each row into a Google Calendar event
4. Use the **Google Calendar API** to insert recurring events

The script handles:

- Calculating the correct first occurrence date for each weekday
- Applying weekly recurrence rules (`RRULE`)
- Assigning a distinct color per subject for visual clarity
- Adding the teacher's name to the event description

## Prerequisites

Before running the script, you'll need:

- A **Google Cloud project** with the Calendar API enabled
- A **service account** with a `credentials.json` key file
- The service account email added as a **guest** (with edit access) on your Google Calendar
- Python packages: `google-api-python-client`, `google-auth`, `pandas`, `openpyxl`

Install dependencies:

```bash
pip install google-api-python-client google-auth pandas openpyxl
```

## Project Structure

```text
project/
├── credentials.json      # Service account key (keep private, never commit)
├── scheduled.xlsx          # Your schedule spreadsheet
└── create_calendar.py    # The main script
```

### Step 1 — Define Time Slots (Modules)

Each module number maps to a real-world time range. Adjust these to match your school's schedule:

```python
MODULES = {
    1: ("07:45", "08:25"),
    2: ("08:25", "09:05"),
    3: ("09:20", "10:00"),
    4: ("10:00", "10:40"),
    5: ("10:50", "11:30"),
    6: ("11:30", "12:10"),
    7: ("12:10", "12:50"),
}
```

This converts the module number from the spreadsheet into actual `start` and `end` times for each event.

### Step 2 — Assign Colors by Subject

Google Calendar supports 11 color IDs (1–11). Assigning a color per subject makes the calendar much easier to scan at a glance:

```python
COLORS = {
    "English":        "1",   # Blue
    "Language":       "2",   # Green
    "Math":           "3",   # Purple
    "Biology":        "4",   # Red
    "Geography":      "5",   # Yellow
    "Civic Ed.":      "6",   # Orange
    "Tech Drawing":   "7",   # Turquoise
    "Physics":        "8",   # Gray
    "History":        "9",   # Bold Blue
    "Homeroom":       "10",  # Bold Green
}
```

Any subject not in the dictionary will fall back to color `"6"` (orange).

### Step 3 — Map Day Abbreviations

The spreadsheet uses short weekday codes. We map them to Python's `weekday()` indices (Monday = 0):

```python
DAY_MAP = {
    "MO": 0,
    "TU": 1,
    "WE": 2,
    "TH": 3,
    "FR": 4,
}
```

These codes are also used directly in the `RRULE` recurrence string (e.g., `BYDAY=MO`).

### Step 4 — Calculate the First Occurrence

To create a recurring event, Google Calendar needs the **exact datetime of the first instance**. Given a school year start date and a target weekday, we calculate it like this:

```python
from datetime import datetime, timedelta

def get_first_occurrence(start_date: str, target_weekday: int) -> datetime:
    """
    Returns the first date >= start_date that falls on target_weekday.
    target_weekday: 0=Monday, 1=Tuesday, ..., 4=Friday
    """
    date = datetime.strptime(start_date, "%Y-%m-%d")
    days_ahead = (target_weekday - date.weekday()) % 7
    return date + timedelta(days=days_ahead)
```

For example, if the school year starts on a Monday (`2026-03-02`) and we need the first Tuesday, this returns `2026-03-03`.

### Step 5 — Build the Event Object

Each row in the spreadsheet becomes a Google Calendar event with a weekly recurrence rule:

```python
def build_event(row, first_occurrence: datetime) -> dict:
    """Builds a Google Calendar event dict from a schedule row."""
    start_time, end_time = MODULES[row.module]
    teacher = row.teacher if pd.notna(row.teacher) else ""
    until   = END_DATE.replace("-", "") + "T235959Z"

    return {
        "summary":     f"{row.subject} — {teacher}" if teacher else row.subject,
        "description": f"Teacher: {teacher}" if teacher else "",
        "start": {
            "dateTime": first_occurrence.strftime(f"%Y-%m-%dT{start_time}:00"),
            "timeZone": TIMEZONE,
        },
        "end": {
            "dateTime": first_occurrence.strftime(f"%Y-%m-%dT{end_time}:00"),
            "timeZone": TIMEZONE,
        },
        "recurrence": [f"RRULE:FREQ=WEEKLY;BYDAY={row['day']};UNTIL={until}"],
        "colorId":    COLORS.get(row.subject, "6"),
    }
```

The `UNTIL` clause in the `RRULE` ensures events stop at the end of the school year. Without it, the recurrence would go on indefinitely.

## Full Script

```python
import pandas as pd
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# ── Configuration ──────────────────────────────────────────────────────────────

SCOPES      = ["https://www.googleapis.com/auth/calendar"]
CALENDAR_ID = "your_calendar_id@group.calendar.google.com"
START_DATE  = "2026-03-02"   # First day of school
END_DATE    = "2026-12-18"   # Last day of school (used in RRULE UNTIL)

MODULES = {
    1: ("07:45", "08:25"),
    2: ("08:25", "09:05"),
    3: ("09:20", "10:00"),
    4: ("10:00", "10:40"),
    5: ("10:50", "11:30"),
    6: ("11:30", "12:10"),
    7: ("12:10", "12:50"),
}

COLORS = {
    "English":      "1",
    "Language":     "2",
    "Math":         "3",
    "Biology":      "4",
    "Geography":    "5",
    "Civic Ed.":    "6",
    "Tech Drawing": "7",
    "Physics":      "8",
    "History":      "9",
    "Homeroom":     "10",
}

DAY_MAP = {"MO": 0, "TU": 1, "WE": 2, "TH": 3, "FR": 4}

# ── Auth ───────────────────────────────────────────────────────────────────────

creds   = service_account.Credentials.from_service_account_file(
    "credentials.json", scopes=SCOPES
)
service = build("calendar", "v3", credentials=creds)

# ── Helpers ────────────────────────────────────────────────────────────────────

def get_first_occurrence(start_date: str, target_weekday: int) -> datetime:
    """
    Returns the first date >= start_date that falls on target_weekday.
    target_weekday: 0=Monday, 1=Tuesday, ..., 4=Friday
    """
    date = datetime.strptime(start_date, "%Y-%m-%d")
    days_ahead = (target_weekday - date.weekday()) % 7
    return date + timedelta(days=days_ahead)

def build_event(row, first_occurrence: datetime) -> dict:
    """Builds a Google Calendar event dict from a schedule row."""
    start_time, end_time = MODULES[row.module]
    teacher = row.teacher if pd.notna(row.teacher) else ""
    until   = END_DATE.replace("-", "") + "T235959Z"

    return {
        "summary":     f"{row.subject} — {teacher}" if teacher else row.subject,
        "description": f"Teacher: {teacher}" if teacher else "",
        "start": {
            "dateTime": first_occurrence.strftime(f"%Y-%m-%dT{start_time}:00"),
            "timeZone": TIMEZONE,
        },
        "end": {
            "dateTime": first_occurrence.strftime(f"%Y-%m-%dT{end_time}:00"),
            "timeZone": TIMEZONE,
        },
        "recurrence": [f"RRULE:FREQ=WEEKLY;BYDAY={row['day']};UNTIL={until}"],
        "colorId":    COLORS.get(row.subject, "6"),
    }

# ── Main ───────────────────────────────────────────────────────────────────────

df = pd.read_excel("schedule.xlsx")

for _, row in df.iterrows():
    weekday   = DAY_MAP[row["day"]]
    first_occ = get_first_occurrence(START_DATE, weekday)
    event     = build_event(row, first_occ)

    created = service.events().insert(
        calendarId=CALENDAR_ID,
        body=event,
    ).execute()

    print(f"Created: {created['summary']}  →  {created.get('htmlLink')}")

print("Done! All events created.")
```

## Expected Excel Format

Your `schedule.xlsx` should have at least these columns:

| Subject      | Module | Day | Techear |
| ------------ | ------ | --- | ------- |
| Math         | 1      | MO  | Pérez   |
| Math         | 2      | MO  | Pérez   |
| English      | 3      | TU  | Smith   |
| Language     | 4      | WE  | García  |
| Science      | 5      | TH  | Johnson |
| History      | 6      | FR  | Lee     |
| Art          | 7      | FR  | Davis   |
| Physical Ed. | 8      | MO  | Taylor  |

Column names are case-sensitive and must match exactly. The `teacher` column is optional per row (the script handles `NaN` gracefully).

## Result

After running the script, your calendar will contain:

- All subjects with correct times and weekdays
- Weekly recurrence through the end of the school year
- Color-coding by subject for easy scanning
- Teacher name in the event description
- Events that automatically stop at the configured end date

## Tips & Extensions

- **Delete all events:** If you need to reset the calendar, iterate over `service.events().list()` and call `service.events().delete()` for each event.
- **Multiple classes:** The script works for any number of rows — just add more entries to the spreadsheet.
- **Different timezones:** Change `"America/Argentina/Buenos_Aires"` to any valid [IANA timezone string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- **Holidays:** Pre-filter the DataFrame to exclude holiday weeks, or use the `EXDATE` field in the recurrence rule.
- **Shared calendars:** Share the calendar with students or parents directly from Google Calendar settings — all events will be visible immediately.

## Conclusion

Automating administrative tasks with Python is one of the highest-leverage things you can do as a developer. A script that takes an afternoon to write can save hours every semester. With the Google Calendar API and pandas, transforming a simple Excel schedule into a fully populated, color-coded school calendar takes just a few seconds to run — and zero manual effort after setup.
