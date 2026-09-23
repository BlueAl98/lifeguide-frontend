---
name: lifeguide
description: Architecture and conventions for the Lifeguide Angular frontend (Angular 22, standalone, signals, zoneless, clean feature-based architecture, small components) plus the contract of the Lifeguide Spring Boot backend it consumes (endpoints, response/request shapes, JWT auth, error envelope). Use for any work in this frontend, including creating features, components, services, forms, routes, API calls, auth, or tests.
---

# Lifeguide — Frontend (Angular)

Frontend for the Lifeguide Spring Boot backend (sibling folder `../lifeguide`).
This is a **living document**. The project is new, so when the owner decides
something, update this file instead of guessing ahead.

- **Backend contract** (endpoints, TS models, auth, errors): [backend-api.md](backend-api.md).
  Read it before writing any HTTP call, model, or form that talks to the API.
- Backend architecture skill: `../lifeguide/.claude/skills/lifeguide/SKILL.md`.

## Stack (researched 2026-09-23)

- **Angular 22** (latest stable line is 22.x). Standalone only, no NgModules.
- **Zoneless** change detection and **OnPush by default** (v22). Don't add `zone.js`
  or set `changeDetection` by hand.
- TypeScript `strict: true` + Angular `strictTemplates`.
- **Vitest** is the CLI's default test runner (`ng test`; CI: `ng test --no-watch`).
- HTTP: `provideHttpClient(withFetch(), withInterceptors([...]))`.
- Data loading: `httpResource` (stable since v22) for reads, `HttpClient` for writes.
- Forms: **Signal Forms** (`@angular/forms/signals`, stable in v22) for new forms.

> Before you create the project: the folder has only this skill so far.
> Scaffold from the parent folder (`spring projects/`) with
> `npx @angular/cli@latest new lifeguide-frontend --style=scss --ssr=false`.
> If the CLI refuses because the folder isn't empty, move `.claude/` out, scaffold, then move it back.
> Pick styling/UI-kit only with the owner (not decided yet, see Open conventions).

## Angular rules (from the official angular.dev best practices + style guide)

**Components**
- Keep each component small with one job. Guideline: if a template is over ~100 lines or the
  class does more than one job, split it.
- Signal APIs only: `input()`, `input.required()`, `output()`, `model()` (two-way),
  `viewChild()`/`contentChild()`. No `@Input`/`@Output`/`@ViewChild` decorators.
- Mark Angular-initialized members `readonly` (inputs, outputs, models, queries).
- Mark members used only by the template `protected`. `public` = real component API.
- Class order: injected deps → inputs/outputs/models → queries → state/computed → methods.
- No `standalone: true` (it's the default), no `ChangeDetectionStrategy.OnPush` (default).
- No `@HostBinding`/`@HostListener`. Use the `host: {}` object in the decorator.
- No `NgClass`/`NgStyle`. Use `[class.x]`, `[style.x]`, `[class]`, `[style]`.
- Don't import `CommonModule`. Import only the pipes/directives the template uses.
- Inline template for small components. Otherwise use separate `.html`/`.scss` with relative paths.
- Name handlers after what they do (`saveGoal()`), not the event (`handleClick()`).
- Keep lifecycle hooks thin. They call well-named methods.
- Use `NgOptimizedImage` (`ngSrc`) for static images.

**Templates**
- Built-in control flow: `@if`, `@for (x of xs; track x.id)`, `@switch`, `@let`, `@defer`.
  Never `*ngIf`/`*ngFor`. `@for` always needs `track` (use the entity `id`).
- No complex logic in templates. Move it into a `computed()`.
- Don't call globals like `new Date()` in templates.
- Use `@defer (on viewport)` for heavy below-the-fold parts (e.g. video embeds).

**State / signals**
- `signal()` for local state, `computed()` for derived state, `linkedSignal()` for state
  that resets when a source changes. `set`/`update` only, never mutate in place.
- Use `effect()` only for side effects that leave Angular (localStorage, logging, DOM APIs).
  Never use it to copy one signal into another; use `computed`/`linkedSignal` for that.
- Observables are fine inside services (HTTP, streams). Convert at the edge with `toSignal()`
  or use `httpResource` so components only see signals.

**DI / services**
- Use `inject()`, not constructor injection.
- Singleton services: `@Service()` (v22+) or `@Injectable({ providedIn: 'root' })`.
- One service, one responsibility.

**Routing**
- Lazy-load every feature: `loadChildren: () => import('./features/goals/goals.routes')`,
  or `loadComponent` for single pages.
- Enable `withComponentInputBinding()` so route params reach page components as `input()`s
  (e.g. `id = input.required<string>()` for `/goals/:id`).
- Use functional guards/resolvers only (`CanActivateFn`, `ResolveFn`), never class-based ones.

**Forms**
- New forms use Signal Forms:
  ```ts
  import { form, FormField, required, email, minLength } from '@angular/forms/signals';
  protected readonly model = signal<LoginRequest>({ email: '', password: '' });
  protected readonly loginForm = form(this.model, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Email must be valid' });
    required(p.password, { message: 'Password is required' });
  });
  ```
  ```html
  <input type="email" [formField]="loginForm.email" />
  @if (loginForm.email().touched() && loginForm.email().invalid()) {
    @for (e of loginForm.email().errors(); track e) { <small>{{ e.message }}</small> }
  }
  ```
  Component `imports: [FormField]`. Submit reads `this.model()`.
  Mirror the backend's validation messages ([backend-api.md](backend-api.md#validation-rules-mirror-them-client-side-backend-still-decides)).
  Check the exact validator names in the Signal Forms docs before using any beyond `required`/`email`.
- If a Signal Forms feature is missing, fall back to Reactive Forms, never template-driven.

**Accessibility**: pass AXE and meet WCAG AA (labels on every input, focus management after
navigation/dialogs, color contrast, ARIA only where native semantics aren't enough).

## Architecture: clean + feature-based

Mirror the backend's features (`auth`, `goals`, …). Dependencies point **inward**:

```
ui (presentational) ─┐
                     ├─> domain (models, pure logic)
feature (pages) ─> data-access ─┘
```

```
src/
  main.ts
  app/
    app.ts  app.config.ts  app.routes.ts
    core/                         # app-wide singletons, loaded once
      http/    api-error.ts  error.interceptor.ts  auth.interceptor.ts
      auth/    auth-store.ts (token + current user signals)  auth.guard.ts
      layout/  shell/ header/ footer/
    shared/                       # reusable, feature-agnostic
      ui/      button/ card/ spinner/ empty-state/ error-message/
      util/    date-parse.ts ...
    features/
      auth/
        domain/        auth.models.ts
        data-access/   auth-api.ts
        feature/       login-page/ register-page/
        ui/            login-form/ register-form/
        auth.routes.ts
      goals/
        domain/        goal.models.ts  (API types + UI types + mappers)
        data-access/   goals-api.ts  goals-store.ts (optional)
        feature/       goal-list-page/ goal-detail-page/
        ui/            goal-card/ category-section/ foro-card/ comment-item/ video-item/
        goals.routes.ts
```

Layer rules. Keep them strict so the layers stay "clean":

| Layer         | Contains                                                   | May import                 | Never |
|---------------|------------------------------------------------------------|----------------------------|-------|
| `domain`      | interfaces/types, pure functions, API→UI mappers           | nothing Angular            | `HttpClient`, components |
| `data-access` | API services, stores (signals), `httpResource` factories   | `domain`, `core/http`      | components, routing |
| `feature`     | **smart/container** pages: inject stores, handle routing, pass data down | `data-access`, `ui`, `domain`, `shared` | raw `HttpClient` |
| `ui`          | **dumb/presentational** components: `input()` in, `output()` out | `domain` types, `shared/ui` | `inject()` of services, HTTP, router |
| `shared`      | generic UI + utils used by 2+ features                     | nothing from `features/`   | feature-specific logic |
| `core`        | interceptors, auth, layout, app-wide providers             | `shared`                   | feature internals |

- One feature must **not** import another feature's internals. If both need something,
  move it to `shared` (or `core` if it's a singleton).
- Components never call `HttpClient` directly. They go through `data-access`.
- Convert API DTOs into UI-friendly models in `domain` mappers (e.g. parse the two date formats
  there). Templates never parse or format raw backend data.

### Keeping components small: how to split

Split along the nesting of the backend data tree:

```
goal-detail-page (feature: reads id input, owns httpResource, loading/error states)
 └ goal-header (ui)
 └ @for category → category-section (ui)
      ├ @for foro  → foro-card (ui) └ @for comment → comment-item (ui)
      └ @for video → video-item (ui, @defer on viewport)
```

- Only the page knows about loading, error, and routing. Children just render what they get.
- Handle loading/error/empty as their own states with the shared `spinner` / `error-message` /
  `empty-state` components. Don't scatter them as `@if` checks inside leaf components.

## Patterns

**API service (data-access)**
```ts
@Service()
export class GoalsApi {
  private readonly http = inject(HttpClient);
  goals() { return httpResource<GoalResponse[]>(() => '/api/goals', { defaultValue: [] }); }
  goal(id: () => string | undefined) {
    return httpResource<GoalResponse>(() => (id() ? `/api/goals/${id()}` : undefined));
  }
}
```
`httpResource` must be created in an injection context (field initializer). In the page:
```ts
readonly id = input.required<string>();
private readonly api = inject(GoalsApi);
protected readonly goal = this.api.goal(this.id);
```
Resource members: `value()`, `hasValue()` (use it as a guard before `value()`), `isLoading()`,
`error()`, `status()` (`idle|loading|reloading|resolved|error|local`), `reload()`.
Writes (login, register, future POSTs) use `HttpClient` directly, e.g. `firstValueFrom(this.http.post(...))`
or an observable. Don't use `httpResource` for mutations.

**Auth**
- `AuthStore` (core): `token = signal<string | null>(...)`, `isLoggedIn = computed(...)`,
  `roles = computed(() => decode(token()).roles ?? [])`. Save the token in `localStorage` with an
  `effect()` (wrap storage access in try/catch). Clear it on logout or on a 401.
- `authInterceptor` (`HttpInterceptorFn`): adds `Authorization: Bearer` to `/api/**`, but skips
  `/api/login` and `/api/register`.
- `errorInterceptor`: turns `HttpErrorResponse.error` into the typed `ApiError`. On a 401 from a
  protected route, it logs out and navigates to `/login`.
- `authGuard` (`CanActivateFn`) returns a `UrlTree` to `/login`. It's a UX gate only; the backend enforces access.

## Testing

- Vitest + TestBed. Keep specs next to the file (`goal-card.spec.ts`).
- `domain` mappers: plain unit tests, no TestBed.
- `ui` components: set inputs with `fixture.componentRef.setInput(...)`, assert the rendered DOM and outputs.
- `data-access`: `provideHttpClient()` + `provideHttpClientTesting()`, `HttpTestingController`.
- Pages: mock the store/API with a provider override.

## Naming (Angular style guide, v20+)

- kebab-case files named after the class, **no type suffix**: `goal-card.ts` / `.html` / `.scss`
  / `.spec.ts` for class `GoalCard`. Suffixes stay only where they carry meaning
  (`auth.guard.ts`, `error.interceptor.ts`, `goals.routes.ts`).
- Selector prefix: `lg-` (e.g. `lg-goal-card`); directive attributes in camelCase (`[lgAutofocus]`).
- Group folders by feature, never by type (no top-level `components/`, `services/`).
- Avoid catch-all files like `utils.ts` / `helpers.ts`. Name them for what they do.

## Open / pending conventions

- [ ] Styling: SCSS only vs Tailwind vs Angular Material/CDK. Ask the owner.
- [ ] SSR / prerendering: assumed **off** for now.
- [ ] Global store library (NgRx SignalStore) vs plain signal services. Default: plain signal services until complexity needs more.
- [ ] i18n: the backend returns English messages. Decide if the UI is Spanish/English.
- [ ] Backend gaps that affect the UI: no CORS, `/api/goals/{id}` may not be public, no write
      endpoints for foros/comments, comments aren't linked to users.

## Updating this skill

Edit this file (and `backend-api.md` whenever backend DTOs change) instead of creating new docs.
Replace assumptions with confirmed decisions and tick items off above.
