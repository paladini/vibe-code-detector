# 🕵️‍♂️ Vibe Code Detector

### *Forensic analysis for the AI-generated web.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)

**Vibe Code Detector** is the ultimate open-source browser extension designed to identify "Vibe Coding" patterns. In an era where AI generates entire applications from a single prompt, this tool provides transparency by detecting the unique "DNA" left behind by AI IDEs, agents, and platforms.

---

## 🚀 Why Vibe Code Detector?

"Does this code have a vibe?" — If you've asked yourself this while browsing a modern web app, you're not alone. AI-first development tools like **Cursor**, **v0**, and **Lovable** have a distinct signature. We help you unmask it.

### 🔍 What we detect:
- **AI IDEs & Agents**: Signatures from `Cursor`, `Windsurf`, `Trae`, `Replit Agent`, `Devin`, and `Claude Code`.
- **Generation Platforms**: Markers from `v0.dev`, `Lovable.dev`, `Bolt.new`, `Stackblitz`, and `Google AI Studio`.
- **The "Vibe" Stack**: High-density Tailwind CSS, Shadcn/UI patterns, Radix primitives, and Lucide iconography.
- **Heuristic Forensics**: Analysis of utility class density, SVG export patterns, and common AI placeholder text.

---

## 🛠 How it Works

The detector runs a multi-layered heuristic scan on the active tab:

1. **Utility Density**: Calculates the ratio of Tailwind classes per DOM element.
2. **Component Fingerprinting**: Identifies specific Radix/Shadcn attribute patterns.
3. **IDE Signatures**: Scans for internal markers like `__cursor` or specific AI-generated comments.
4. **Platform Metadata**: Checks for generator tags and specific deployment signatures.

---

## 📦 Installation

### For Users
1. Download the latest release from the [Releases](https://github.com/paladini/vibe-code-detector/releases) page.
2. Unzip the file.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer Mode**.
5. Click **Load unpacked** and select the unzipped folder.

### For Developers
```bash
# Clone the repo
git clone https://github.com/paladini/vibe-code-detector.git

# Install dependencies
npm install

# Run development server
npm run dev


# Build for production (Chrome Extension)
npm run build
```

---

## 🏗️ Building & Publishing the Chrome Extension

1. **Build the extension:**
   - Run `npm run build`. This generates all final files (popup.html, popup.js, assets, etc.) inside the `extension/` folder.

2. **Load the extension in Chrome:**
   - Open `chrome://extensions/`.
   - Enable **Developer Mode**.
   - Click **Load unpacked** and select the `extension/` folder.

3. **Update after code changes:**
   - Run `npm run build` again and reload the extension in Chrome.

> **Note:**
> - Do not manually edit generated files inside `extension/` (such as popup.html or popup.js). They are overwritten on every build.
> - The React app, styles, and logic are bundled automatically by Vite.

---

## 🤝 Contributing

We want this to be the **gold standard** for AI detection. New AI tools are popping up every week, and we need your help to keep our heuristics up to date!

1. **Add new Heuristics**: Found a new AI tool? Open a PR with its signature.
2. **Refine Scoring**: Help us balance the weights for better accuracy.
3. **UI/UX**: Improve the extension's "forensic" aesthetic.

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) or just open a PR!

---

## 👤 Author

**Fernando Paladini**
- GitHub: [@paladini](https://github.com/paladini)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built for the transparent web. 🌐
</p>
