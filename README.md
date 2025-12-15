# DevAgent AI 🤖

**DevAgent AI** is an intelligent, agentic IDE suite designed to automate the repetitive and complex tasks of the Software Development Life Cycle (SDLC). 

Powered by **Google Gemini 2.5 Flash**, it acts as a unified dashboard where developers can offload unit testing, debugging, code reviews, and log analysis to specialized AI agents.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-v19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-v5-3178c6.svg)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8e7cc3.svg)

---

## 🚀 Features

### 1. **Automated Test Generator** `views/TestGenerator.tsx`
- **Input:** Raw source code (Python, JS, Go, Java, etc.).
- **Output:** Comprehensive unit test suites (Jest, PyTest, JUnit).
- **Behavior:** Covers happy paths, edge cases, and mocks dependencies automatically.

### 2. **Intelligent Debugger** `views/Debugger.tsx`
- **Input:** Broken code + Error logs/Stack traces.
- **Output:** Root cause analysis and fixed code snippets.
- **Behavior:** Correlates logic errors with runtime exceptions to provide a precise fix.

### 3. **Senior Code Reviewer** `views/CodeReview.tsx`
- **Input:** Code snippets or Pull Request diffs.
- **Output:** Detailed Markdown report covering Security (OWASP), Performance, and Clean Code principles.
- **Persistence:** Automatically saves review history for compliance auditing.

### 4. **Log Analysis Agent** `views/LogAnalyzer.tsx`
- **Input:** Unstructured raw server logs.
- **Output:** Structured incident reports with severity classification and remediation steps.

### 5. **Refactoring Bot** `views/RefactorBot.tsx`
- **Input:** Legacy or "Spaghetti" code.
- **Output:** Modernized, optimized, and readable code reducing cyclomatic complexity.

### 6. **Local Database Manager** `views/DatabaseManager.tsx`
- **Data Privacy:** All data is stored locally in the browser (LocalStorage).
- **Portability:** Export your entire session history to a JSON database file (`devagent_db.json`) and import it on any machine.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Dark Mode optimized)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Build Tooling:** ES Modules (No-bundler setup for rapid prototyping)

---

## 📂 Project Structure

```bash
/
├── index.html              # Entry point
├── src/
│   ├── App.tsx             # Main Router & Layout
│   ├── components/         # Reusable UI (Buttons, Sidebar, Markdown)
│   ├── services/           # API Integration (Gemini AI Service)
│   ├── utils/              # Local Storage & Persistence Logic
│   ├── views/              # Main Application Screens
│   │   ├── Dashboard.tsx       # Analytics & Stats
│   │   ├── TestGenerator.tsx   # Agent: Test Writer
│   │   ├── Debugger.tsx        # Agent: Bug Fixer
│   │   ├── CodeReview.tsx      # Agent: Reviewer
│   │   └── DatabaseManager.tsx # Data Export/Import
│   └── types.ts            # TypeScript Interfaces
└── README.md
```

---

## 💡 The Problem & Solution

### The Problem
Modern software engineering involves a high "context-switching tax." Developers spend hours writing boilerplate tests, parsing obscure error logs, and debating style in code reviews. Existing tools are fragmented across CLIs, CI/CD pipelines, and web portals.

### The Solution
**DevAgent AI** unifies these workflows into a **Single Pane of Glass**. Instead of manually writing a Jest suite, you paste your function into the Test Generator. Instead of Googling a stack trace, you hand it to the Debugger. It transforms the IDE from a text editor into an **Agentic Command Center**.

---

## 📸 Screenshots

*(Add your screenshots here)*

| Dashboard | Code Review |
|:---:|:---:|
| ![Dashboard Mockup](https://via.placeholder.com/400x250?text=Dashboard+Analytics) | ![Review Mockup](https://via.placeholder.com/400x250?text=Code+Review+Output) |

| Test Generator | Debugger |
|:---:|:---:|
| ![TestGen Mockup](https://via.placeholder.com/400x250?text=Test+Generation) | ![Debugger Mockup](https://via.placeholder.com/400x250?text=AI+Debugging) |

---

## 🔮 Future Enhancements

1.  **GitHub Integration:** Directly pull PRs for review and push fixes back to the repo.
2.  **Multi-File Context:** Allow agents to understand the entire project structure, not just snippets.
3.  **Custom Persona Configuration:** Allow users to define custom system prompts (e.g., "Review like a Senior Go Engineer").
4.  **Vector Database:** Implement RAG (Retrieval-Augmented Generation) to let the AI learn from your specific codebase documentation.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Google Gemini**
