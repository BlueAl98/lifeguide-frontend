# Lifeguide backend API contract (for the frontend)

Source of truth: the Spring Boot backend at `../lifeguide` (sibling folder).
Its own architecture skill is `../lifeguide/.claude/skills/lifeguide/SKILL.md`.
This file is a **snapshot** (verified 2026-09-23 against the backend's
`presentation` records). If a response looks different at runtime, re-check the
backend's `feature/*/presentation/*Response.java` and update this file.

## Base URL / environment

- Dev backend: `http://localhost:8081` (`application-dev.yaml`, profile `dev`).
- Every route is under `/api`.
- **No CORS config exists on the backend yet.** In dev, use the Angular CLI dev-server
  proxy (`proxy.conf.json`, `/api` → `http://localhost:8081`) and call relative
  URLs (`/api/goals`) instead of hardcoding the host. Adding CORS is a backend task.

## Auth

- Stateless JWT, **access token only** (no refresh token). Lifetime: 900 s (15 min).
- Send it as `Authorization: Bearer <accessToken>`.
- The token payload carries `sub` = userId, `email`, and `roles` (e.g. `["USER"]`,
  `["ADMIN","USER"]`). The frontend may *decode* it for UI hints (show admin
  links), but it never verifies it. The backend is the real gate.
- Roles are a snapshot taken at login. After a role change, the user must log in again.
- When the token expires, requests get a 401 → clear the token and redirect to login.

## Endpoints

| Method | Path              | Auth    | Request body      | Success                          |
|--------|-------------------|---------|-------------------|----------------------------------|
| POST   | `/api/register`   | public  | `RegisterRequest` | **201** `RegisterResponse`       |
| POST   | `/api/login`      | public  | `LoginRequest`    | **200** `LoginResponse`          |
| GET    | `/api/goals`      | public  | —                 | **200** `GoalResponse[]`         |
| GET    | `/api/goals/{id}` | ⚠️ see note | —             | **200** `GoalResponse` / 404     |

> ⚠️ `app.security.public-paths` lists `/api/goals` only. Spring's path matcher
> does **not** treat that as a prefix, so `/api/goals/{id}` probably needs a JWT
> (anonymous call → 401). If you want it public, add `/api/goals/**` (or
> `/api/goals/*`) to the backend YAML. That's a config change, not a code change.

No write endpoints exist for goals/categories/foros/videos/comments yet.
The whole tree is read-only and nested under goals.

## TypeScript models (mirror the Java records 1:1)

```ts
// auth
export interface RegisterRequest { email: string; username: string; password: string; }
export interface RegisterResponse {
  id: number; email: string; username: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;            // Instant → ISO-8601 UTC, e.g. "2026-09-23T10:15:30Z"
}
export interface LoginRequest { email: string; password: string; }
export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresInSeconds: number;
}

// goals tree: Goal 1─N Category 1─N {Foro 1─N Comment, Video}
export interface GoalResponse     { id: number; name: string; categories: CategoryResponse[]; }
export interface CategoryResponse { id: number; name: string; foros: ForoResponse[]; videos: VideoResponse[]; }
export interface ForoResponse     { id: number; title: string; description: string; comments: CommentResponse[]; }
export interface VideoResponse    { id: number; name: string; url: string; }
export interface CommentResponse  {
  id: number; username: string;
  date: string;                 // LocalDateTime → ISO WITHOUT zone, e.g. "2026-09-01T18:30:00"
  description: string; likes: number;
}
```

Notes:
- Child objects **don't** include their parent id (`CategoryResponse` has no `goalId`, etc.).
  Nesting is the relation. Keep ids from the parent context if you need them.
- `CommentResponse.username` is plain text. It isn't linked to a user account yet.
- Java `Long` → TS `number` (fine; ids are well below 2^53).
- Two date formats: `createdAt` has a zone (`Instant`), `date` doesn't (`LocalDateTime`).
  Parse them in the mapper, not in templates.

## Validation rules (mirror them client-side, backend still decides)

| Field (register) | Rule                          | Backend message                                   |
|------------------|-------------------------------|---------------------------------------------------|
| email            | required, valid email         | "Email is required" / "Email must be valid"       |
| username         | required, 3–50 chars          | "Username is required" / "Username must be between 3 and 50 characters" |
| password         | required, min 8 chars         | "Password is required" / "Password must be at least 8 characters" |

Login: email required + valid email, password required.

## Error envelope (every error, every endpoint)

```ts
export interface ApiError {
  code: ApiErrorCode;   // branch on this, never on message text
  message: string;      // human-readable, safe to show
  status: number;
  path: string;
  timestamp: string;    // ISO-8601
}
export type ApiErrorCode =
  | 'VALIDATION_ERROR'   // 400: only the FIRST failing field's message is returned
  | 'BAD_REQUEST'        // 400
  | 'UNAUTHORIZED'       // 401: missing/invalid/expired token, OR login "Invalid email or password"
  | 'FORBIDDEN'          // 403
  | 'NOT_FOUND'          // 404: e.g. "Goal not found"
  | 'METHOD_NOT_ALLOWED' // 405
  | 'CONFLICT'           // 409: register with an email/username that already exists
  | 'INTERNAL_ERROR';    // 500
```

Handling guidance:
- `VALIDATION_ERROR` carries only one message (not a per-field map). Show it as a form-level error.
- Login failure is deliberately generic (`UNAUTHORIZED`, "Invalid email or password").
  Don't try to tell "unknown email" apart from "wrong password".
- A 401 on a *protected* call means the session ended: log out and redirect. A 401 from
  `/api/login` is just bad credentials. Don't redirect in that case.
- A network failure (`status 0`) doesn't come back as `ApiError`. Handle it separately.
