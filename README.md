# Laravel + Vue Starter Kit

A small starter kit built with Laravel 13, Vue 3, TypeScript, Inertia.js, Tailwind CSS 4, and Vite.

It has no auth, admin panel, roles, payments, or AI features — just a clean base you can build on.

## Requirements

- PHP 8.3+
- Composer 2
- Node.js 20+ and npm
- MySQL 8 (or SQLite for local development)

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
npm run build
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

### Database

`.env.example` uses MySQL. Create the database first:

```sql
CREATE DATABASE laravel_vue_starter CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then run:

```bash
php artisan migrate
```

To use SQLite instead, set this in `.env`:

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

Create the file if needed:

```bash
touch database/database.sqlite
```

Or in PowerShell:

```powershell
New-Item database/database.sqlite -ItemType File -Force
```

You can also run `composer setup`, which installs dependencies, creates `.env`, generates the key, migrates, and builds the frontend.

## Run the app

```bash
composer dev
```

This starts Laravel, the queue listener, the log viewer, and Vite together.

Or run them separately:

```bash
php artisan serve
npm run dev
```

Open <http://localhost:8000>.

## Scripts

| Command | What it does |
| --- | --- |
| `composer setup` | Install everything and prepare the app |
| `composer dev` | Start the server, queue, logs, and Vite |
| `composer test` | Run the tests |
| `composer lint` | Format PHP with Pint |
| `npm run dev` | Start Vite |
| `npm run build` | Type-check and build production assets |
| `npm run type-check` | Type-check only |

## Frontend structure

```text
resources/js/
├── app.ts                # Inertia setup and page resolver
├── components/ui/        # Button and Input
├── composables/          # useContactForm, useFlash
├── layouts/              # AppLayout with navigation
├── lib/                  # routes, utils, validation
├── pages/                # Welcome and ExampleForm
└── types/                # Shared TypeScript types
```

## Example form

`/example-form` shows both validation layers:

1. `useContactForm` validates in the browser.
2. `StoreExampleMessageRequest` validates again in Laravel.
3. On success, the controller redirects back with a flash message.

The controller does not save anything yet. Replace the comment in `ExampleFormController::store()` with your own logic.

## Adding a page

1. Return `Inertia::render('Posts/Index')` from a controller.
2. Add the route in `routes/web.php`.
3. Add the URL to `resources/js/lib/routes.ts`.
4. Create `resources/js/pages/Posts/Index.vue`.

## Notes

- App name comes from `APP_NAME` in `.env`.
- Shared Inertia props live in `app/Http/Middleware/HandleInertiaRequests.php`.
- Styling lives in `resources/css/app.css`.
- npm scripts call Node directly because the project path contains `&`, which breaks Windows `.bin` shims.

## License

MIT
