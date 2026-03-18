---
title: 15 Essential Redmine Plugins - Complete Reference Guide
description: 'Explore the 15 most powerful Redmine plugins: Agile, CRM, Finance, Drive, and more. Detailed features, use cases, and configuration tips for each plugin to enhance your project management workflow.'
featured: false
date: 2026-03-18
slug: /blog/redmine-plugins-reference/
tags:
  - redmine
  - plugins
  - project-management
  - productivity
  - tool-review
repo: 'https://github.com/afreisinger/redmine'
---

# The 15 Plugins That Transform Your Redmine

**Author:** DevOps Team  
**Date:** March 2026  
**Reading time:** 8 min

## Overview

With our Docker stack, you get **15 premium plugins** preinstalled and ready to use. Discover what each one does and how to leverage them to the maximum.

## 1. 📊 Agile (v1.6.13) - Agile Management

### What is it?

Transforms Redmine into a complete agile tool with Sprints, Kanban boards, and burndown charts.

### Use Cases

- **Scrum Masters**: Create sprints and plan iterations
- **Agile Teams**: Visualize progress in real-time
- **Retrospectives**: Analyze velocity and productivity

### Key Features

```
✓ Sprints (User Stories)
✓ Interactive Kanban board
✓ Automatic burndown charts
✓ Planning Poker estimation
✓ Agile reports
```

### Example

```
Sprint: "v2.0 Release"
├─ User Story: "Improved dashboard" (8 points)
├─ User Story: "REST API" (13 points)
└─ User Story: "OAuth authentication" (5 points)
```

**Link:** https://www.redmine.org/plugins/redmine_agile

---

## 2. 💰 Budgets (v1.0.8) - Budget Control

### What is it?

Manage budgets per project, allocate costs, and get alerts when limits are exceeded.

### Use Cases

- **Project Managers**: Track expenses
- **CFOs**: Budget reports
- **Clients**: View project costs

### Features

```
✓ Project budgets
✓ Costs by activity
✓ Limit alerts
✓ ROI reports
✓ Forecasts
```

### Typical Dashboard

```
Project: "Client Portal"
├─ Total Budget: $50,000
├─ Spent: $32,500 (65%)
├─ Available: $17,500 (35%)
└─ Final Projection: $48,000 ✓
```

**Link:** https://www.redmine.org/plugins/redmine_budgets

---

## 3. ✅ Checklists (v4.0.1) - Task Sub-steps

### What is it?

Adds checklist functionality within tasks to break work into sub-steps.

### Use Cases

- **QA**: Test checklists
- **DevOps**: Deployment steps
- **Documentation**: Requirements to cover

### QA Example

```
Task: "Validate login in browsers"
 ☐ Chrome 120+
 ☐ Firefox 121+
 ☐ Safari 17+
 ☐ Edge 120+
 ✓ Mobile Chrome
```

Progress: **5/6 completed (83%)**

**Link:** https://www.redmine.org/plugins/redmine_checklists

---

## 4. 📄 CMS (v1.2.6) - Content Management

### What is it?

Create web pages, blogs, and documentation within Redmine without code.

### Use Cases

- **Documentation**: Project wiki
- **Knowledge Base**: FAQ
- **Landing Pages**: Project promotion

### Typical Structure

```
/wiki
├─ /setup → Installation
├─ /api → API Documentation
├─ /faq → Frequently asked questions
└─ /troubleshooting → Solutions
```

**Link:** https://www.redmine.org/plugins/redmine_cms

---

## 5. 🏢 Contacts & Invoices (v4.2.15) - CRM + Invoicing

### What is it?

Manage client contacts, addresses, and issue invoices from Redmine.

### Use Cases

- **Agencies**: Clients and invoicing
- **Consultancies**: Revenue tracking
- **SaaS**: Customer monitoring

### Modules

```
Contacts
├─ Company information
├─ Multiple contact data
└─ Interaction history

Invoices
├─ Auto-generation from tasks
├─ Custom templates
└─ Bank integration
```

**Link:** https://www.redmine.org/plugins/redmine_contacts_invoices

---

## 6. 🔗 CRM (v4.4.4) - Contact Management

### What is it?

Complete CRM system integrated in Redmine: contacts, companies, deals, and activities.

### Use Cases

- **Sales**: Opportunity pipeline
- **Business**: Customer tracking
- **Networking**: Contact database

### Typical Pipeline

```
Contact: "Acme Corp"
├─ Company: Technology
├─ Contacts: John Garcia (CEO), Mary Lopez (CTO)
├─ Deals: "ERP Implementation" ($150k - 60% probability)
└─ Activities: Call on 3/15 ✓
```

**Link:** https://www.redmine.org/plugins/redmine_crm

---

## 7. 📁 Drive (v1.2.4) - File Storage

### What is it?

Integrated cloud storage for sharing large documents without limits.

### Use Cases

- **Remote Teams**: Share files
- **Design**: Portfolio of files
- **Versioning**: Change history

### Structure

```
/Project A
├─ /Documents
│  ├─ Proposal.pdf
│  └─ Contract.docx (v3)
├─ /Designs
└─ /Releases
```

Granular access control: public, private, by role.

**Link:** https://www.redmine.org/plugins/redmine_drive

---

## 8. ⭐ Favorite Projects (v2.1.6) - Quick Access

### What is it?

Mark projects as favorites for immediate access from home.

### Benefit

Users with 20+ projects can filter to the top 5.

```
My Dashboard
├─ Favorite Projects
│  ├─ Client Portal
│  ├─ Backend API
│  └─ Mobile App
└─ All Projects (17 more)
```

**Link:** https://www.redmine.org/plugins/redmine_favorite_projects

---

## 9. 💵 Finance (v2.1.12) - Financial Control

### What is it?

Deep financial analysis: revenue, costs, margins per project.

### Use Cases

- **C-Level**: Profitability per project
- **Management**: Identify profitable projects
- **Pricing**: Adjust rates based on data

### Typical Analysis

```
Project: "SaaS Platform"
├─ Revenue: $240,000
├─ Direct Costs: $120,000
├─ Indirect Costs: $30,000
├─ Net Margin: $90,000 (37.5%)
└─ ROI: 3.0x
```

**Link:** https://www.redmine.org/plugins/redmine_finance

---

## 10. 👥 People (v1.6.13) - Personnel Management

### What is it?

Employee directory, departments, skills, and resource planning.

### Use Cases

- **HR**: Employee database
- **Management**: Team skills
- **Planning**: Resource allocation

### Structure

```
Department: Development
├─ John (Senior Dev - Python, Django)
├─ Mary (Mid Dev - Python, React)
└─ Carlos (Junior Dev - Python)

Availability:
├─ John: 80% (Project A)
├─ Mary: 100% (Project B)
└─ Carlos: 60% (Training)
```

**Link:** https://www.redmine.org/plugins/redmine_people

---

## 11. 📦 Products (v2.2.7) - Product Catalog

### What is it?

Manage product/service catalog, prices, and availability.

### Use Cases

- **E-commerce**: Inventory
- **Services**: Offer catalog
- **Products**: Feature list

### Example

```
Product: "Technical Consulting"
├─ SKU: CONS-001
├─ Price: $150/hour
├─ Available: Yes
├─ Stock: ∞ (service)
└─ Included in: 12 projects
```

**Link:** https://www.redmine.org/plugins/redmine_products

---

## 12. ❓ Questions (v1.0.8) - Q&A Forum

### What is it?

StackOverflow-like Q&A system integrated in Redmine.

### Use Cases

- **Support**: Interactive FAQ
- **Community**: User Q&A
- **Live Documentation**: Voted answers

### How It Works

```
User asks: "How to reset password?"
├─ Answer 1: "Via email" (10 votes)
├─ Answer 2: "Via admin" (5 votes) ← Selected
└─ Comments: "Also works if..."
```

**Link:** https://www.redmine.org/plugins/redmine_questions

---

## 13. 📊 Resources (v2.0.7) - Resource Planning

### What is it?

Human resource planning, teams, and capacity management.

### Use Cases

- **PM**: Assign people to tasks
- **Capacity Planning**: Workload map
- **Forecasting**: Availability prediction

### Extended Gantt View

```
January 2026
├─ John ────┤ Project A (80%)
├─ Mary ────────┤ Project B (100%)
└─ Carlos ────┤ Training (60%)
```

**Link:** https://www.redmine.org/plugins/redmine_resources

---

## 14. 🏷️ Tags (v2.1.0) - Flexible Tagging

### What is it?

Free tagging system for issues without rigid hierarchy.

### Use Cases

- **Organization**: "bug", "feature", "tech-debt"
- **Filtering**: Combine tags for searches
- **Analysis**: "critical-issues", "customer-issues"

### Example

```
Issue: "Login slow"
├─ Tags: #bug #performance #critical #auth
└─ Quick search: Click any tag
```

**Link:** https://www.redmine.org/plugins/redmine_tags

---

## 15. ✏️ Zenedit (v3.0.0) - Advanced Editor

### What is it?

WYSIWYG editor for task descriptions with syntax highlighting and previews.

### Use Cases

- **Documentation**: Rich format
- **Specifications**: Code with colors
- **Communication**: Clear descriptions

### Features

```
✓ Full markdown
✓ Syntax highlighting (Python, JS, SQL...)
✓ Tables
✓ Image insertion
✓ Live preview
✓ Emoticons
```

**Link:** https://www.redmine.org/plugins/redmine_zenedit

---

## 🚀 Recommended Combos by Use Case

### For Agencies

```
Agile + CRM + Budgets + Contacts & Invoices + Finance
```

### For Product Startups

```
Agile + Finance + People + Drive + Zenedit
```

### For Consulting

```
CRM + People + Budgets + Finance + Drive
```

### For Pure Development Teams

```
Agile + Checklists + Resources + Tags + Zenedit
```

---

## 🔧 Enabling Plugins

```
Administration → Plugins → [Plugin] → Enable
```

Some plugins require database migration (automatic).

## 📚 Resources

- [Redmine Plugin List](https://www.redmine.org/plugins)
- [Our Full Stack Documentation](../README.en.md)

---

**Experiment with the plugins!** Each one is designed to solve a specific problem.
