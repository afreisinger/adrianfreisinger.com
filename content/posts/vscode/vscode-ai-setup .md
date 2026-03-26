---
title: 'VSCode AI Setup: Continue + Copilot + Ollama (Real-World Workflow)'
description: 'A practical VSCode setup optimized for AI-assisted development using Continue, GitHub Copilot, and local models via Ollama. Includes layout, performance tweaks, and real-world fixes.'
featured: true
date: 2026-03-26
slug: /blog/vscode-ai-setup/
tags:
  - vscode
  - ai
  - copilot
  - ollama
  - continue
  - devtools
  - productivity
repo: 'https://gist.githubusercontent.com/afreisinger/1e5ba99e22f5d631d8dcf6f9f5028683/raw/b466aa74c1d2efb85f2442bdd130a65d185aaf7d/settings.json'
---

# VSCode AI Setup: Continue + Copilot + Ollama (Real-World Workflow)

This is not just a config file.

This is a **real-world AI-assisted development setup** using:

- Continue (agent-style workflows)
- GitHub Copilot (inline suggestions)
- Ollama (local LLMs)
- VSCode optimized for long sessions and low friction

---

## 🧠 Goal

Build a development environment where:

- AI is **always available but never intrusive**
- Context switching is minimized
- Local + cloud models coexist
- The editor is optimized for **reading long AI responses**

---

## ⚙️ Core Setup

### Layout Strategy

```text
| Continue | Code Editor | Explorer |
```

---

### Key VSCode Configuration

```json
{
  // ─────────────────────────────────────────
  // 🧠 LAYOUT → | Continue | Código | Explorer |
  // ─────────────────────────────────────────
  "workbench.sideBar.location": "right",
  "workbench.panel.defaultLocation": "left",
  "workbench.iconTheme": "material-icon-theme",

  // ─────────────────────────────────────────
  // 🎨 TEMA BASE
  // ─────────────────────────────────────────
  "workbench.colorTheme": "Tokyo Night",

  // ─────────────────────────────────────────
  //  VENTANA
  // ─────────────────────────────────────────
  "window.openFoldersInNewWindow": "off",
  "window.openFilesInNewWindow": "off",

  // ─────────────────────────────────────────
  // 📐 VALIDACIÓN DE SCHEMAS
  // ─────────────────────────────────────────
  "json.schemaDownload.enable": false,

  // ─────────────────────────────────────────
  // 🎯 COLORES IA-FRIENDLY
  // ─────────────────────────────────────────
  "workbench.colorCustomizations": {
    "editor.background": "#1a1b26",
    "editor.foreground": "#c0caf5",
    "editor.lineHighlightBackground": "#2a2b3c",
    "editorCursor.foreground": "#ff9e64",
    "editor.selectionBackground": "#364a82",
    "editor.inactiveSelectionBackground": "#2d3f76",
    "editorIndentGuide.background1": "#2a2b3c",
    "editorIndentGuide.activeBackground1": "#414868",
    "sideBar.background": "#16161e",
    "sideBar.foreground": "#c0caf5",
    "panel.background": "#16161e",
    "panel.border": "#2a2b3c",
    "editorGroup.border": "#2a2b3c",
    "activityBar.background": "#16161e",
    "activityBar.foreground": "#7aa2f7",
    "statusBar.background": "#16161e",
    "statusBar.foreground": "#c0caf5"
  },

  // ─────────────────────────────────────────
  // 🧠 SINTAXIS LEGIBLE
  // ─────────────────────────────────────────
  "editor.tokenColorCustomizations": {
    "comments": "#565f89",
    "strings": "#9ece6a",
    "keywords": "#7aa2f7",
    "functions": "#7dcfff",
    "variables": "#c0caf5"
  },

  // ─────────────────────────────────────────
  // ✍️ FUENTE
  // ─────────────────────────────────────────
  "editor.fontFamily": "'JetBrains Mono', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 22,

  // ─────────────────────────────────────────
  // 👀 UX IA / LECTURA LARGA
  // ─────────────────────────────────────────
  "editor.wordWrap": "on",
  "editor.wordWrapColumn": 100,
  "editor.wrappingStrategy": "advanced",
  "editor.smoothScrolling": true,
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.minimap.enabled": false,
  "editor.scrollbar.vertical": "auto",
  "editor.scrollbar.horizontal": "hidden",
  "editor.guides.indentation": false,
  "editor.renderWhitespace": "none",
  "editor.lineNumbers": "on",
  "editor.renderLineHighlight": "gutter",
  "editor.matchBrackets": "never",

  // ─────────────────────────────────────────
  // 💾 AUTOSAVE
  // ─────────────────────────────────────────
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 800,

  // ─────────────────────────────────────────
  // 📁 EXPLORER
  // ─────────────────────────────────────────
  "explorer.compactFolders": false,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,

  // ─────────────────────────────────────────
  // 💻 TERMINAL
  // ─────────────────────────────────────────
  "terminal.integrated.defaultProfile.linux": "zsh",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.scrollback": 10000,
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "block",
  "terminal.integrated.experimentalUseTitleEvent": true,
  "terminal.integrated.allowExtensions": true,

  // Git + Python terminal integration
  "git.enableTerminalIntegration": true,
  "python.terminal.activateEnvironment": true,
  "python.terminal.launchArgs": ["-i"],
  "python.terminal.shellIntegration.enabled": true,
  "python.terminal.basicREPL.enabled": true,

  // ─────────────────────────────────────────
  // 🧠 IA / SUGERENCIAS
  // ─────────────────────────────────────────
  "editor.inlineSuggest.enabled": true,
  "editor.suggestSelection": "first",
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": true
  },
  "editor.suggestOnTriggerCharacters": true,
  "editor.quickSuggestionsDelay": 100,
  "editor.suggest.showWords": false,
  "editor.suggest.showSnippets": false,
  "editor.acceptSuggestionOnEnter": "smart",
  "editor.tabCompletion": "on",

  // ─────────────────────────────────────────
  // 🧹 UI
  // ─────────────────────────────────────────
  "breadcrumbs.enabled": true,
  "workbench.statusBar.visible": true,

  // ─────────────────────────────────────────
  // 📦 GIT
  // ─────────────────────────────────────────
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "gitlens.ai.model": "vscode",
  "gitlens.ai.vscode.model": "copilot:gpt-4.1",

  // ─────────────────────────────────────────
  // 🤖 CONTINUE
  // ─────────────────────────────────────────
  "continue.openOnStartup": false,
  "continue.telemetryEnabled": false,

  // ─────────────────────────────────────────
  // 🧠 SCHEMAS
  // ─────────────────────────────────────────
  "yaml.schemas": {
    "file:///home/afreisinger/.vscode/extensions/continue.continue-1.2.19-linux-x64/config-yaml-schema.json": [
      ".continue/**/*.yaml"
    ]
  },
  "json.schemas": [
    {
      "fileMatch": ["**/.markdownlintrc", "**/.markdownlint.json"],
      "url": "file:///home/afreisinger/.vscode/schemas/markdownlint-config-schema.json"
    }
  ],

  // ─────────────────────────────────────────
  // 🤖 COPILOT OPTIMIZADO
  // ─────────────────────────────────────────
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "yaml": false
  }
}
```

---

## 🤖 AI Stack

### Continue

- Codebase analysis
- Refactoring
- Multi-step reasoning

Supports:

- @file
- @selection
- @codebase
- @docs

---

### GitHub Copilot

- Inline suggestions
- Autocomplete
- Fast iteration

---

### Ollama (Local Models)

```text
ollama pull qwen2.5
ollama pull llama3.2
```

---

## 🔥 Context Handling with @

Example:

```text
@selection: refactor this function to async/await
```

---

## 🧪 Real-World Fixes

### MarkdownLint warning

```json
"json.schemaDownload.enable": false
```

---

### Multiple VSCode windows

```json
"window.openFoldersInNewWindow": "off"
```

---

### Telemetry warning

```json
"continue.telemetryEnabled": false
```

---

## 💻 Terminal Setup

```json
"terminal.integrated.defaultProfile.linux": "zsh"
```

---

## ⚡ Productivity

- Ctrl + Shift + P → Command palette
- Ctrl + B → Toggle sidebar
- Ctrl + ` → Terminal

---

## 🚀 Final Thoughts

This setup is about building a **real AI-assisted workflow**, not just installing tools.
