<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
    id?: string;
    label?: string;
    error?: string;
    hint?: string;
    type?: string;
    required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    id: undefined,
    label: undefined,
    error: undefined,
    hint: undefined,
    type: 'text',
    required: false,
});

defineOptions({ inheritAttrs: false });

const model = defineModel<string>({ default: '' });
const attrs = useAttrs();
const uid = useId();

const inputId = computed(() => props.id ?? `field-${uid}`);
const errorId = computed(() => `${inputId.value}-error`);
const hintId = computed(() => `${inputId.value}-hint`);

const describedBy = computed(() => {
    const ids = [props.error ? errorId.value : null, props.hint ? hintId.value : null].filter(Boolean);

    return ids.length > 0 ? ids.join(' ') : undefined;
});

const classes = computed(() =>
    cn(
        'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none transition placeholder:text-neutral-400',
        'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
        props.error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
            : 'border-neutral-300',
        attrs.class as string | undefined,
    ),
);

const passThroughAttrs = computed(() => {
    const { class: _class, ...rest } = attrs;

    return rest;
});
</script>

<template>
    <div class="space-y-1.5">
        <label
            v-if="label"
            :for="inputId"
            class="block text-sm font-medium text-neutral-800"
        >
            {{ label }}
            <span v-if="required" class="text-indigo-600" aria-hidden="true">*</span>
        </label>

        <input
            :id="inputId"
            v-model="model"
            v-bind="passThroughAttrs"
            :type="type"
            :required="required"
            :aria-invalid="error ? 'true' : undefined"
            :aria-describedby="describedBy"
            :class="classes"
        />

        <p v-if="error" :id="errorId" class="text-sm text-red-600">
            {{ error }}
        </p>
        <p v-else-if="hint" :id="hintId" class="text-sm text-neutral-500">
            {{ hint }}
        </p>
    </div>
</template>
