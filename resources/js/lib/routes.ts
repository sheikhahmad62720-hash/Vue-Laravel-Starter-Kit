/**
 * Frontend URLs for named Laravel routes.
 *
 * Keep these values in sync with routes/web.php. Centralizing them here keeps
 * components free of hard-coded paths.
 */
export const routes = {
    home: '/',
    exampleForm: '/example-form',
} as const;

export type RouteName = keyof typeof routes;
