export interface Flash {
    success: string | null;
    error: string | null;
}

/**
 * Props shared with every Inertia response by HandleInertiaRequests.
 */
export interface SharedProps {
    appName: string;
    flash: Flash;
    [key: string]: unknown;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
}
