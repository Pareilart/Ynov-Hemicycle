---
trigger: always_on
---

# TypeScript Style Guide

## Strict mode

- strict: true in tsconfig.json
- Always use explicit types
- Avoid any, prefer unknown or proper generics
- Use readonly where appropriate

## Return types

- Always specify return types for public methods
- Use generic typing for reusable functions
- Access modifiers
- Use private, protected, and public explicitly
- Prefer #private fields for encapsulation