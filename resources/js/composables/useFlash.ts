import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { SharedProps } from '@/types';

/**
 * Read the flash messages shared by HandleInertiaRequests.
 */
export function useFlash() {
    const page = usePage<SharedProps>();

    return {
        success: computed(() => page.props.flash?.success ?? null),
        error: computed(() => page.props.flash?.error ?? null),
    };
}
