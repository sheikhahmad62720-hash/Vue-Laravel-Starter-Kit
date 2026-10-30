import { useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { routes } from '@/lib/routes';
import { isValidEmail } from '@/lib/validation';
import type { ContactFormData } from '@/types';

type ContactField = keyof ContactFormData;

/**
 * Form state and validation for the example contact form.
 *
 * Client-side rules provide immediate feedback, while Laravel validates the
 * request again. Server errors are surfaced through Inertia's `form.errors`.
 */
export function useContactForm() {
    const form = useForm<ContactFormData>({
        name: '',
        email: '',
        subject: '',
    });

    const touched = ref<Partial<Record<ContactField, boolean>>>({});
    const submitted = ref(false);

    const clientErrors = computed<Partial<Record<ContactField, string>>>(() => {
        const errors: Partial<Record<ContactField, string>> = {};

        const name = form.name.trim();
        if (!name) {
            errors.name = 'Please enter your name.';
        } else if (name.length < 2) {
            errors.name = 'Your name must be at least 2 characters.';
        } else if (name.length > 100) {
            errors.name = 'Your name may not be longer than 100 characters.';
        }

        const email = form.email.trim();
        if (!email) {
            errors.email = 'Please enter your email address.';
        } else if (!isValidEmail(email)) {
            errors.email = 'Please enter a valid email address.';
        } else if (email.length > 255) {
            errors.email = 'Your email may not be longer than 255 characters.';
        }

        const subject = form.subject.trim();
        if (!subject) {
            errors.subject = 'Please enter a subject.';
        } else if (subject.length < 3) {
            errors.subject = 'The subject must be at least 3 characters.';
        } else if (subject.length > 255) {
            errors.subject = 'The subject may not be longer than 255 characters.';
        }

        return errors;
    });

    /**
     * Show client errors only after a field has been touched or submitted,
     * then prefer the server error when one exists.
     */
    function errorFor(field: ContactField): string | undefined {
        if (!submitted.value && !touched.value[field]) {
            return undefined;
        }

        return clientErrors.value[field] ?? form.errors[field];
    }

    function touch(field: ContactField): void {
        touched.value[field] = true;
    }

    function update(field: ContactField, value: string): void {
        form[field] = value;
        form.clearErrors(field);
    }

    function submit(): void {
        submitted.value = true;

        if (Object.keys(clientErrors.value).length > 0) {
            return;
        }

        form.post(routes.exampleForm, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                touched.value = {};
                submitted.value = false;
            },
        });
    }

    return {
        form,
        clientErrors,
        errorFor,
        touch,
        update,
        submit,
        processing: computed(() => form.processing),
    };
}
