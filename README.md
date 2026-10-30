# Laravel + Vue Starter Kit

A minimal starter kit built on Laravel 13, Vue 3, TypeScript, Inertia.js, Tailwind CSS 4, and Vite.

It gives you a working frontend/backend setup without the parts many projects end up deleting: no authentication, no admin dashboard, no roles or permissions, no payments, and no AI integrations.

## What's included

- Laravel 13 with PHP 8.3+
- Vue 3 with TypeScript and `<script setup>`
- Inertia.js for server-driven pages (no API layer, no SSR)
- Tailwind CSS 4 through the official Vite plugin
- MySQL-ready configuration with a documented SQLite alternative
- A welcome page, shared layout, responsive navigation, and reusable form controls
- An example form with client-side and server-side validation
- Feature tests for both pages and the form submission

## Requirements

- PHP 8.3 or newer with the usual Laravel extensions
- Composer 2
- Node.js 20 or newer and npm
- MySQL 8 (or SQLite for local development)

## Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

### Database

The example `.env.example` targets MySQL. Create the database first:

```sql
CREATE DATABASE laravel_vue_starter CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run the migrations:

```bash
php artisan migrate
```

To use SQLite instead, comment out the `DB_*` MySQL values in `.env` and use:

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

Create the file if it does not exist:

```bash
touch database/database.sqlite
```

On Windows PowerShell:

```powershell
New-Item database/database.sqlite -ItemType File -Force
```

### Frontend

```bash
npm install
npm run build
```

For a one-command setup you can also use the Composer script, which installs dependencies, creates `.env`, generates the app key, migrates, and builds the frontend:

```bash
composer setup
```

## Development

```bash
composer dev
```

This starts the Laravel server, queue listener, log viewer, and Vite dev server together.

If you prefer to run the pieces yourself:

```bash
php artisan serve
npm run dev
```

The app is available at <http://localhost:8000>.

## Scripts

### Composer

| Command | Description |
| --- | --- |
| `composer setup` | Install dependencies, create `.env`, generate the key, migrate, and build |
| `composer dev` | Run the server, queue, logs, and Vite together |
| `composer test` | Clear the config cache and run the test suite |
| `composer lint` | Format PHP with Laravel Pint |

### npm

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check with `vue-tsc` and build production assets |
| `npm run type-check` | Type-check without emitting files |

> **Note:** the npm scripts call Node entry points directly instead of using `vite`/`vue-tsc` from `node_modules/.bin`. This keeps them working on Windows when the project path contains characters such as `&`, which break the generated `.bin` shims.

## Directory structure

Laravel's standard structure is preserved. The frontend lives in `resources/js`:

```text
resources/
├── css/
│   └── app.css                 # Tailwind entry point and theme tokens
└── js/
    ├── app.ts                  # Inertia bootstrap and page resolver
    ├── env.d.ts                # Vite and Vue type declarations
    ├── components/
    │   └── ui/
    │       ├── Button.vue      # Polymorphic button/link with variants
    │       └── Input.vue       # Labeled input with errors and hints
    ├── composables/
    │   ├── useContactForm.ts   # Example form state and validation
    │   └── useFlash.ts         # Read flash messages from Inertia props
    ├── layouts/
    │   └── AppLayout.vue       # Shared shell and responsive navigation
    ├── lib/
    │   ├── routes.ts           # Frontend route URLs
    │   ├── utils.ts            # `cn()` class merge helper
    │   └── validation.ts       # Small shared validators
    ├── pages/
    │   ├── ExampleForm.vue     # Form demo
    │   └── Welcome.vue         # Landing page
    └── types/
        └── index.ts            # Shared TypeScript types
```

Backend pieces used by the example:

```text
app/Http/
├── Controllers/
│   ├── ExampleFormController.php
│   └── WelcomeController.php
├── Middleware/
│   └── HandleInertiaRequests.php  # Shares `appName` and `flash`
└── Requests/
    └── StoreExampleMessageRequest.php
```

## How the example form works

1. `GET /example-form` renders the `ExampleForm` Inertia page.
2. `useContactForm` keeps the form state and validates `name`, `email`, and `subject` in the browser. Errors appear after a field is touched or the form is submitted.
3. Valid input is posted to `POST /example-form` through Inertia's `useForm`.
4. `StoreExampleMessageRequest` validates the same rules on the server.
5. On success, the controller redirects back with a flash message. `HandleInertiaRequests` shares it, `useFlash` reads it, and the page shows a success notice while the form resets.

Server validation failures are returned by Inertia and merged into `form.errors`, so the UI handles both layers the same way.

The controller does not persist anything. Replace the comment in `ExampleFormController::store()` with your own logic, such as saving a model or sending a notification.

## Adding a page

1. Create a controller action that returns an Inertia response:

   ```php
   public function index(): \Inertia\Response
   {
       return \Inertia\Inertia::render('Posts/Index');
   }
   ```

2. Register the route in `routes/web.php`.

3. Add the URL to `resources/js/lib/routes.ts` so components do not hard-code paths.

4. Create `resources/js/pages/Posts/Index.vue`. The page resolver in `app.ts` loads any `.vue` file under `pages/` by name, so `Posts/Index` maps to `pages/Posts/Index.vue`.

5. Wrap the page content in `<AppLayout>` if it needs the shared navigation.

## Customization

- **Styling:** edit `resources/css/app.css`. Theme tokens and Tailwind configuration live there in Tailwind 4.
- **Layout and navigation:** edit `resources/js/layouts/AppLayout.vue`.
- **Buttons and inputs:** extend the variants in `components/ui/Button.vue` and the props in `components/ui/Input.vue`. Both use `cn()` so incoming `class` attributes win over defaults.
- **Shared props:** add global data in `app/Http/Middleware/HandleInertiaRequests.php`.
- **App name:** set `APP_NAME` in `.env`. It is shared as `appName` and used for Inertia page titles.
- **Testing:** add feature tests under `tests/Feature`. `tests/TestCase.php` calls `withoutVite()` so tests do not need built assets.

## What's intentionally left out

- Authentication, registration, password reset, and email verification
- Admin dashboards and CRUD scaffolding
- Roles, permissions, and teams
- Payments, subscriptions, and billing
- AI features and integrations
- API routes, Sanctum, and SSR

Add these only when a project actually needs them.

## Verifying the project

```bash
composer test
composer lint
npm run type-check
npm run build
```

## License

Released under the [MIT license](LICENSE).
