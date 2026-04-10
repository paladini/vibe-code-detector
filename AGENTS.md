# 🕵️‍♂️ Vibe Code Detector - Forensic Guidelines

## Core Mission: "Unmask the AI-Generated Web"
Vibe Code Detector is a forensic tool for the modern web. We believe in transparency. As "Vibe Coding" becomes the standard for rapid development, we provide the community with the tools to identify the origin of software.

## Technical Heuristics & Signatures

### 1. IDE & Agent Fingerprints (High Confidence)
- **Cursor**: `__cursor`, `cursor-ignore`, and specific comment blocks.
- **Windsurf**: Internal markers and specific class naming patterns.
- **Trae**: ByteDance's AI IDE markers (`trae-ide`).
- **Replit Agent**: `replit-agent` signatures and `.replit` artifacts.
- **Devin/Claude Code**: Specific autonomous agent rastro patterns.

### 2. Platform Signatures (Direct Markers)
- **v0.dev**: `v0` generator meta tags and specific Radix/Tailwind combinations.
- **Lovable.dev**: `lovable-project` markers and GPT-Engineer legacy signatures.
- **Bolt.new / Stackblitz**: `bolt-` prefixed classes and Stackblitz runtime artifacts.
- **Google AI Studio**: `metadata.json` references and Apache-2.0 license headers.

### 3. Structural "Vibe" Heuristics
- **Tailwind Density**: A ratio of >4.5 utility classes per element is a strong indicator of prompt-based styling.
- **Shadcn/Radix DNA**: Detection of `data-radix-` attributes combined with standard Shadcn color variables (`--background`, `--foreground`).
- **Lucide Iconography**: The default choice for almost all AI generators.
- **Placeholder DNA**: Common prompt-default texts like "Feature 1", "Lorem Ipsum", or generic "Bento Grid" layouts.

## Contribution Standards
- **English Only**: All code, comments, and documentation must be in English.
- **Evidence-Based**: New heuristics must be backed by examples from the target AI tool.
- **Minimalist Aesthetic**: Maintain the "Forensic/Dark" UI theme.

## Release Strategy
- **Automated Releases**: GitHub Actions handles packaging and tagging.
- **Open Source**: The project is MIT licensed to encourage widespread adoption and contribution.
