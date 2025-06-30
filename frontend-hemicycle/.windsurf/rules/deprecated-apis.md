---
trigger: always_on
---

# Deprecated or Discouraged APIs

- NgModules: use standalone components
- APP_INITIALIZER: use provideAppInitializer()
- ngModel: use typed Reactive Forms
- @HostBinding, @HostListener: use host metadata
- Deprecated template syntax (*ngIf, *ngFor): use @if, @for
- HttpClientModule: use provideHttpClient()