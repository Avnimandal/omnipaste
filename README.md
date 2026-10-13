# ⚡ OmniPaste v2.0 Pro — The Zero-Click Developer Inspector

> Replace `jwt.io`, `epochconverter`, `jsonlint`, `base64decode`, `crontab.guru`, and secret sanitizers with **ONE single input box**.  
> **100% Client-Side. Zero Backend. Zero Telemetry.**

---

## 🎯 What is OmniPaste?

Developers constantly switch between multiple ad-ridden websites to inspect random snippets:
- `jwt.io` to decode tokens
- `epochconverter.com` for timestamps
- `jsonlint.com` to format and validate JSON
- `base64decode.org` for base64 strings
- `crontab.guru` to understand cron expressions
- Color pickers for hex/rgb/hsl conversions
- Manual search to convert URLs or JSON payloads into cURL/Fetch/Python requests
- Manual find-and-replace to sanitize production secrets before pasting into ChatGPT

**OmniPaste** replaces all of them with **zero clicks**. Paste any snippet into the input box, and OmniPaste automatically identifies the format, parses the data, alerts on leaked credentials, and renders interactive inspection cards immediately.

---

## 🏆 Killer Features (v2.0 Upgrade)

### 1. 🚨 Security & Secret Leak Shield (Top Priority)
- **Heuristic Scanner:** Detects leaked credentials in real-time as you type or paste:
  - **OpenAI API Keys** (`sk-proj-...`, `sk-...`)
  - **AWS Access Keys** (`AKIA...`, `ASIA...`)
  - **Stripe Secret Keys** (`sk_live_...`, `rk_live_...`)
  - **Private Keys** (`-----BEGIN RSA PRIVATE KEY-----`)
  - **Database Connection URIs with Passwords** (`postgres://user:pass@host:5432/...`, `mongodb://...`, `mysql://...`, `redis://...`)
  - **GitHub Personal Access Tokens** (`ghp_...`, `github_pat_...`)
  - **Slack Bot Tokens** (`xoxb-...`, `xoxp-...`)
  - **Bearer Tokens**
- **Eye-Catching Red Alert Banner:** Warns developers immediately with secret counts, severity tags, and redacted masked previews.
- **1-Click "Sanitize for ChatGPT & Copy":** Replaces all detected credentials with safe mock placeholders (e.g., `sk-mock-openai-key-hidden`, `AKIA_MOCK_AWS_ACCESS_KEY`, `MOCK_PASSWORD`) and copies the sanitized payload to your clipboard in 1 click!

### 2. ⏰ Cron Schedule Expression Humanizer
- **Auto-Detection:** Detects 5-field cron expressions (`*/15 * * * *`, `30 8 * * *`, `0 9-17 * * 1-5`, etc.) and cron macros (`@daily`, `@hourly`, `@weekly`, `@monthly`).
- **Natural English Translation:** Translates syntax into clear English:
  - `*/15 * * * *` ➔ *"Runs every 15 minutes, every day"*
  - `30 8 * * *` ➔ *"Runs at 08:30 AM, every day"*
  - `0 9-17 * * 1-5` ➔ *"Runs between 09:00 AM and 05:00 PM, Monday through Friday"*
- **Field Breakdown Table:** Highlights Minute, Hour, Day of Month, Month, and Day of Week with range indicators.
- **Run Predictor:** Simulates the next 3 upcoming trigger runs.

### 3. 💻 1-Click Code Generator (URLs & JSON)
- Integrated code generator tabs inside both **URL** and **JSON** inspection cards:
  - 📋 **cURL** (pre-formatted with HTTP method, headers, and payload)
  - 📋 **JavaScript `fetch()`** (clean `async/await` syntax with JSON stringify)
  - 📋 **Python `requests`** (idiomatic Python with `requests.get()` or `requests.post(json=...)`)
- Instant one-click copy buttons for each language.

---

## ⚡ Additional Inspection Modules

| Detected Format | Capabilities & Output |
| :--- | :--- |
| **UNIX Epoch Timestamp** | Detects seconds (10 digits), ms (13 digits), microseconds, and floats. Outputs **ISO 8601**, **RFC 2822**, **Local Time**, and relative human time (*"2 hours ago"*, *"in 3 days"*). |
| **JWT (JSON Web Token)** | Decodes 3-part tokens. Renders syntax-highlighted **Header** and **Payload**, claims overview, signature preview, and live active/expired countdown badges. |
| **JSON Formatter & Linter** | Formats valid JSON with depth level, recursive key count, and byte compression ratio. For invalid JSON, pinpoints line and column with a code pointer and an **Auto-Fix** button. |
| **Cascading Base64 Decoder** | Decodes UTF-8 safely. If decoded Base64 is also valid JSON, automatically triggers **both** the Base64 decoded card AND the JSON inspector card! Shows image thumbnails for image data URIs. |
| **HEX & Color Formatter** | Live swatch box, interactive color picker, RGB/HSL/CSS variable/Tailwind class formats, and **WCAG Contrast Ratios** against `#000` and `#fff`. |
| **URL & Query Parameters** | Full URL breakdown + searchable **Query Parameters table** (Key vs Value) with individual copy buttons and a **"Copy as JSON"** utility. |
| **Cryptographic Hashes** | Real-time **SHA-256**, **SHA-1**, **SHA-512** (via native `crypto.subtle`), and client-side **MD5** hashes. |
| **Raw String Inspection** | Character, word, line, and UTF-8 byte counts, URL encoding, Base64 encoding, and formatted `hexdump -C` byte preview. |

---

## 🚀 Quick Start

### Option 1: Direct File Open (Offline Ready)
Double-click `index.html` in your browser. No server or internet connection is required.

### Option 2: Local Node Preview Server
```bash
node server.js
```
Then visit: [http://localhost:3000](http://localhost:3000)

---

## ⌨️ Quick Demos for Judges
Click any pill on the **Quick Demos** bar in the header:
- 🚨 **`Security Scanner`**: Loads a sample environment configuration with OpenAI, AWS, Stripe, DB, and Slack secrets to showcase the red alert banner and ChatGPT sanitizer.
- ⏰ **`Cron Sample`**: Loads `*/15 8-18 * * 1-5` to showcase the natural English translation and schedule predictor.
- **`Sample JWT`**, **`Sample Epoch`**, **`Sample JSON`**, **`Sample Hex Color`**, **`Sample Base64`**, **`Sample URL`**.
