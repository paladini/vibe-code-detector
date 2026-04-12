# Contributing to Vibe Code Detector

First off, thank you for considering contributing to Vibe Code Detector! It's people like you that make the web more transparent.

## How Can I Contribute?

### Reporting Bugs
- Use the GitHub Issues tracker.
- Describe the bug and provide steps to reproduce it.
- Mention the website URL where the detection failed or gave a false positive.

### Suggesting Heuristics
- AI tools evolve fast. If you find a new signature (meta tags, specific CSS classes, internal markers), please share it!
- Open an issue or a PR with the new heuristic logic.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code follows the existing style (TypeScript, Tailwind).
5. Write a clear, concise commit message.

## Technical Guidelines
- **Language**: All code and documentation must be in **English**.
- **Heuristics**: `src/lib/vibe-detector.ts` is the single source of truth for all factor definitions and detection logic. `extension/content.js` mirrors that logic (without imports) and must be kept in sync. Always update both files together.
- **UI**: Maintain the "Forensic/Dark" aesthetic using Tailwind CSS.

## Style Guide
- Use 2 spaces for indentation.
- Use PascalCase for React components.
- Use camelCase for functions and variables.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.
