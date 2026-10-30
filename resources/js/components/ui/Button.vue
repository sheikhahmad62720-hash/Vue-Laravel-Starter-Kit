<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed, useAttrs } from 'vue';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
    href?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    href: undefined,
    variant: 'primary',
    size: 'md',
    type: 'button',
    loading: false,
    disabled: false,
    block: false,
});

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const isLink = computed(() => Boolean(props.href));
const isPlainAnchor = computed(
    () => Boolean(props.href) && (props.href!.startsWith('#') || /^https?:\/\//.test(props.href!)),
);

// Inertia's Link handles internal visits; hashes and external URLs use <a>.
const component = computed(() => {
    if (!isLink.value) {
        return 'button';
    }

    return isPlainAnchor.value ? 'a' : Link;
});

const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
    secondary: 'border border-neutral-300 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50',
    ghost: 'text-neutral-700 hover:bg-neutral-100',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
};

const classes = computed(() =>
    cn(
        base,
        variants[props.variant],
        sizes[props.size],
        props.block && 'w-full',
        attrs.class as string | undefined,
    ),
);

const passThroughAttrs = computed(() => {
    const { class: _class, ...rest } = attrs;

    return rest;
});
</script>

<template>
    <component
        :is="component"
        v-bind="passThroughAttrs"
        :href="href"
        :type="isLink ? undefined : type"
        :disabled="isLink ? undefined : disabled || loading"
        :aria-disabled="isLink && (disabled || loading) ? 'true' : undefined"
        :aria-busy="loading || undefined"
        :class="classes"
    >
        <svg
            v-if="loading"
            class="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
            />
        </svg>

        <slot />
    </component>
</template>
