# ⚡ OmniPaste — The Zero-Click Developer Inspector

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=for-the-badge)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Air--Gapped-f59e0b?style=for-the-badge)](README.md#privacy--threat-model)
[![Telemetry](https://img.shields.io/badge/Telemetry-0_Net_Bytes-06b6d4?style=for-the-badge)](README.md#privacy--threat-model)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](package.json)
[![Kernel](https://img.shields.io/badge/Kernel-v2.4_Console-71717a?style=for-the-badge)](src/js/app.js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-emerald?style=for-the-badge)](https://github.com/Avnimandal/omnipaste/pulls)

**An ultra-fast, air-gapped developer diagnostic console that replaces ad-filled inspector websites with a single, reactive input buffer.**

[Live Demo](http://localhost:3000) • [Architecture](#-repository-architecture--file-structure) • [Setup Guide](#-setup--quick-start) • [Feature Matrix](#-feature-matrix) • [Pitch Deck](docs/slides.md)

</div>

---

## 🎯 The Problem OmniPaste Solves

Modern developers constantly jump between multiple disparate, ad-ridden web apps to inspect snippets during debugging:

- `jwt.io` to decode tokens *(risking cloud token leakage)*
- `epochconverter.com` to inspect timestamps
- `jsonlint.com` to format, lint, and repair JSON
- `base64decode.org` to unpack base64 strings
- `crontab.guru` to decipher cron expressions
- Color tools to translate HEX, RGB, HSL, and calculate WCAG accessibility
- Manual search & conversion to turn URLs and JSON into `cURL`, JavaScript `fetch()`, or Python `requests`
- Manual string replacement to sanitize production secrets before pasting into ChatGPT / LLMs

**OmniPaste eliminates all of them.** Simply paste *any* snippet into the input buffer. The in-memory kernel auto-detects formats in real-time, alerts on sensitive credentials, and renders interactive, tactile diagnostic cards **100% in-browser with zero telemetry and zero external network calls**.

---

## 📁 Repository Architecture & File Structure

This repository follows standard, modern web application and open-source GitHub directory conventions:

```text
omnipaste/
├── .github/                      # GitHub configurations & templates
│   └── workflows/
│       └── ci.yml                # Automated syntax & integrity validation
├── docs/                         # Project documentation & presentation assets
│   └── slides.md                 # 7-Slide pitch presentation deck for hackathons/judges
├── src/                          # Application source code
│   ├── css/
│   │   └── style.css             # High-density industrial tactile design system
│   └── js/
│       └── app.js                # Core in-memory detection engine & parsers (v2.4 Kernel)
├── .gitignore                    # Standard Git ignore rules for node, logs, and OS caches
├── index.html                    # Single-page console entry point (GitHub Pages root-ready)
├── LICENSE                       # Permissive MIT open-source license
├── package.json                  # Project metadata, run scripts, and npm dependencies
├── README.md                     # Comprehensive documentation & setup guide
└── server.js                     # Zero-dependency, native Node.js static preview server
```

### Detailed Component Overview

| Path | Purpose & Responsibility |
| :--- | :--- |
| [`index.html`](index.html) | The semantic HTML5 shell. Contains the terminal input buffer, live telemetry status bar, tactical injector buttons, empty-state diagnostic matrix, and ARIA-compliant alert zones. Serves directly on GitHub Pages with zero build step. |
| [`src/js/app.js`](src/js/app.js) | The core in-memory diagnostic kernel. Features heuristic credential scanners, cron translators, code generators, JWT decoders, JSON auto-repair, cascading base64 decoders, color space converters, and Web Crypto digests. |
| [`src/css/style.css`](src/css/style.css) | Custom tactile industrial stylesheet. Replaces generic "AI slop" clichés with deep carbon surfaces (`#09090b`), hairline borders (`#222226`), 2px tactile radii, signal telemetry accents (vermilion, amber, emerald), and snappy 160ms cubic-bezier physics. |
| [`server.js`](server.js) | Lightweight local development server built with native Node.js `http` and `fs` modules. Has **zero npm dependencies**, provides MIME mapping, security traversal checks, and CORS headers. |
| [`docs/slides.md`](docs/slides.md) | Structured 7-slide presentation deck designed for live demonstrations, hackathon pitches, and technical deep dives. |
| [`package.json`](package.json) | NPM configuration defining development scripts (`npm start`, `npm run dev`, `npm run check`) and repository metadata. |
| [`.gitignore`](.gitignore) | Excludes node modules, OS artifacts (`.DS_Store`, `Thumbs.db`), logs, and editor configurations from version control. |

---

## ⚡ Feature Matrix

### 1. 🚨 Security & Secret Leak Intercept
- **Heuristic Scanner:** Detects high-entropy credentials in real-time as you type or paste:
  - **OpenAI API Keys** (`sk-proj-...`, `sk-admin-...`, `sk-...`)
  - **AWS Access Key IDs** (`AKIA...`, `ASIA...`, `A3T...`)
  - **Stripe Secret Keys** (`sk_live_...`, `rk_live_...`)
  - **GitHub Personal Access Tokens** (`ghp_...`, `github_pat_...`)
  - **Slack Bot Tokens** (`xoxb-...`, `xoxp-...`)
  - **Database Connection Strings** (`postgres://...`, `mongodb+srv://...`, `mysql://...`, `redis://...`)
  - **Private Keys** (`-----BEGIN PRIVATE KEY-----`)
  - **Bearer Authorization Tokens**
- **Emergency Alert Banner:** Flashes a high-visibility vermilion alert strip displaying exposed secret counts, masked redactions (`sk-••••••••1234`), and severity rankings.
- **1-Click "Sanitize for LLM & Copy":** Automatically replaces sensitive tokens with safe mock placeholders (e.g., `sk-mock-openai-key-hidden`, `AKIA_MOCK_AWS_ACCESS_KEY`) and copies the sanitized payload to clipboard.
- **Buffer In-Place Replace:** 1-click `REPLACE_BUFFER` button updates the input editor with the sanitized output.

### 2. ⏰ Cron Schedule Humanizer & Predictive Radar
- **Syntax Parsing:** Evaluates standard 5-part cron expressions (`* * * * *`, `*/15 8-18 * * 1-5`) and macros (`@daily`, `@weekly`, `@hourly`, `@monthly`, `@yearly`).
- **Natural Language Translation:** Translates cron expressions into plain English (e.g., *"Runs every 15 minutes, between 08:00 AM and 06:00 PM, Monday through Friday"*).
- **Field Breakdown Grid:** Tabular breakdown of Minute, Hour, Day of Month, Month, and Day of Week.
- **Predictive Radar:** Simulates and displays the next **3 upcoming trigger runs** in local time.

### 3. 💻 One-Click Code Synthesis Workbench
For detected **URLs** and **JSON payloads**, OmniPaste generates clean, idiomatic code snippets in one click:
- 📋 **cURL CLI:** Proper HTTP methods, header flags, and shell-escaped payloads.
- 📋 **JavaScript (ES6):** Clean `async/await` syntax with `fetch()`, headers, and JSON serialization.
- 📋 **Python 3:** Idiomatic `requests` code with dictionaries, boolean conversions, and error-handled parsing.

### 4. 🔍 Deep Diagnostic Engines

| Inspector | Capabilities |
| :--- | :--- |
| **UNIX Epoch** | Supports 10-digit (seconds) and 13-digit (milliseconds) epochs. Displays ISO 8601, RFC 2822, UTC, Local time, and relative human distance (*"2 hours ago"*, *"in 3 days"*). |
| **JWT Token** | Decodes 3-part Base64URL tokens. Syntax-highlights Header & Payload, displays standard claims (`iss`, `sub`, `exp`), and calculates active/expired state with a live countdown timer. |
| **JSON Linter & Auto-Fix** | Calculates recursive key count, nesting depth, and compression delta. Flags syntax errors with line/column pointers and offers a 1-click **Auto-Repair** utility. |
| **Cascading Base64** | UTF-8 safe decoding. **Cascading detection:** If the decoded string is valid JSON, it automatically renders a nested JSON inspection card. Includes visual previews for Data URI images. |
| **Spectral Color Inspector** | Live interactive swatch, conversions across HEX, RGB, HSL, CSS Custom Properties, and Tailwind classes (`bg-[#...]`). Calculates **WCAG AA/AAA contrast compliance scores**. |
| **Cryptographic Digest** | Computes real-time **SHA-256**, **SHA-1**, and **SHA-512** digests using native in-browser `crypto.subtle`, plus client-side **MD5**. |
| **URL & Query String** | Breaks down protocol, hostname, path, and presents query parameters in a searchable key-value grid with individual copy buttons. |
| **Raw Buffer & Hexdump** | Character, word, line, and UTF-8 byte counts, URL encoding, Base64 encoding, and formatted `hexdump -C` byte preview. |

---

## 🚀 Setup & Quick Start

OmniPaste is completely zero-dependency and can be run through multiple environments:

### Method 1: Zero-Install (Direct Browser Open)
Because OmniPaste runs entirely in-browser, no build tools, compilers, or runtimes are required:
1. Clone or download this repository.
2. Double-click [`index.html`](index.html) or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Method 2: Node.js Local Preview Server (Recommended)
OmniPaste includes a zero-dependency native Node.js HTTP server:

```bash
# Clone the repository
git clone https://github.com/Avnimandal/omnipaste.git
cd omnipaste

# Start the preview server
npm start
# or: node server.js
```
Open **`http://localhost:3000`** in your browser.

### Method 3: Python Built-In HTTP Server
If you prefer Python:
```bash
python -m http.server 3000
```
Open **`http://localhost:3000`**.

### Method 4: Deploying to GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your live app is available instantly at `https://<username>.github.io/omnipaste/`.

---

## ⌨️ Tactical Keyboard Shortcuts

| Shortcut / Trigger | Action |
| :--- | :--- |
| `Esc` | Wipe the input buffer and reset diagnostic deck |
| `Ctrl + V` / `Cmd + V` | Paste clipboard contents directly into input buffer |
| `[1] SECRETS_LEAK` | Injects synthetic multi-credential bundle (OpenAI, AWS, Stripe, DB, Slack) |
| `[2] CRON_RADAR` | Injects multi-schedule cron expression (`*/15 8-18 * * 1-5`) |
| `[3] JWT_TOKEN` | Injects 3-part JSON Web Token with claims and expiry |
| `[4] JSON_TREE` | Injects nested JSON payload with arrays, booleans, and nulls |
| `[5] UNIX_EPOCH` | Injects live millisecond epoch timestamp |
| `[6] HEX_COLOR` | Injects hex color for swatch and WCAG contrast check |
| `[7] BASE64_CASCADE`| Injects base64-encoded JSON to demonstrate cascading card evaluation |
| `[8] URL_PARAMS` | Injects complex URL with nested query strings |

---

## 🔒 Privacy & Threat Model

Traditional web tools (such as online JWT decoders or formatters) often send your pasted data to third-party backend servers, analytics providers, or logging sinks. When debugging production payloads, this can inadvertently leak:
- Production database credentials
- Cloud access keys
- Internal microservice routing topology
- Personally Identifiable Information (PII)

### OmniPaste's Air-Gap Guarantee:
1. **0 Network Requests:** Inspection occurs entirely in-memory within the browser DOM. No API routes, no edge functions, no external telemetry scripts.
2. **Native Web Crypto:** All hash digests (SHA-256, SHA-1, SHA-512) utilize the browser's hardware-accelerated `window.crypto.subtle` API.
3. **Safe for Proprietary Code:** You can safely inspect real production connection strings and secrets on an air-gapped machine without an internet connection.

---

## 🛠️ Verification & Quality Checks

Run the syntax validator locally to ensure code integrity:

```bash
npm run check
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal, commercial, and enterprise use.

<div align="center">
<sub>Built with precision for developers who value speed, privacy, and craftsmanship.</sub>
</div>
