---
trigger: always_on
---

# Template Syntax

- Use `@if`, `@for`, `@defer` syntax over *ngIf, *ngFor, etc.
- Use `[class]`, `[style]` for styling
- Avoid ngModel, use typed **reactive forms** instead
- Use signals in templates: `{{ counter() }}`