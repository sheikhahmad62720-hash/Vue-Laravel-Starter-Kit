const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A deliberately permissive email check for instant client-side feedback.
 * Laravel remains the source of truth for validation.
 */
export function isValidEmail(value: string): boolean {
    return EMAIL_PATTERN.test(value.trim());
}
