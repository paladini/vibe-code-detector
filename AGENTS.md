# Vibe Code Detector - Project Guidelines

## Overview
Vibe Code Detector is an open-source tool designed to identify "Vibe Coding" patterns in modern web applications. It detects heuristics from AI-first development tools like Cursor, v0, Lovable, Bolt.new, and others.

## Core Mission
"Does this code have a vibe? Yes, because it was AI-generated, and we're seeing it everywhere."
The goal is to provide transparency about the origin of web software in the age of generative AI.

## Technical Heuristics
- **Tailwind Utility Density**: High ratio of utility classes per element.
- **Shadcn/UI & Radix Patterns**: Specific DOM attributes and class naming conventions.
- **AI Iconography**: Heavy reliance on Lucide icons and generic 24x24 SVG patterns.
- **Platform Markers**: Signatures from Google AI Studio, Lovable, v0, Bolt, Replit, etc.
- **IDE/Agent Signatures**: Internal markers from Cursor (`__cursor`), Windsurf, Trae, and Replit Agents.

## Development Standards
- **Language**: TypeScript (Strict mode).
- **Styling**: Tailwind CSS (Utility-first).
- **Icons**: Lucide React.
- **Animations**: Framer Motion (Motion).
- **Extension**: Manifest v3 compliant.

## Release Pipeline
- **Build**: `npm run build` generates the production assets.
- **Extension Packaging**: The `/extension` directory contains the standalone Manifest v3 files.
- **GitHub Releases**: Automated tagging and ZIP packaging of the `/extension` folder for distribution.

## Contributing
- All code and documentation must be in **English**.
- Focus on adding new heuristics for emerging AI coding agents.
- Maintain a "Technical & Minimalist" design aesthetic.
