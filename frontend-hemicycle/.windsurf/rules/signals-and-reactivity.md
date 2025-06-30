---
trigger: always_on
---

# Signals & Reactivity

- Use `signal()` for local state
- Use `computed()` for derived values
- Use `effect()` for side effects
- Avoid `@Input()/@Output()` in favor of modelInputs and signalInputs
- Prefer `inject()` to constructor injection for simple services