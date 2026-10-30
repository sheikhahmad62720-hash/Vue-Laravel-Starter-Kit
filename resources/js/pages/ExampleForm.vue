<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import { useContactForm } from '@/composables/useContactForm';
import { useFlash } from '@/composables/useFlash';
import AppLayout from '@/layouts/AppLayout.vue';

const { form, errorFor, touch, update, submit, processing } = useContactForm();
const { success, error: flashError } = useFlash();

const serverRules = `'name'    => ['required', 'string', 'min:2', 'max:100'],
'email'   => ['required', 'string', 'email', 'max:255'],
'subject' => ['required', 'string', 'min:3', 'max:255'],`;
</script>

<template>
    <AppLayout>
        <Head title="Example form" />

        <section class="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div class="max-w-2xl">
                <p class="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">Example</p>
                <h1 class="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                    A form with validation on both sides.
                </h1>
                <p class="mt-4 text-base leading-7 text-neutral-600">
                    Client-side rules give instant feedback. Laravel validates the request again, so the
                    server always remains the source of truth.
                </p>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                    <div
                        v-if="success"
                        role="status"
                        class="mb-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                    >
                        <svg
                            class="mt-0.5 size-5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p>{{ success }}</p>
                    </div>

                    <div
                        v-if="flashError"
                        role="alert"
                        class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                        {{ flashError }}
                    </div>

                    <div
                        v-if="form.hasErrors"
                        role="alert"
                        class="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
                    >
                        Please fix the highlighted fields and try again.
                    </div>

                    <form class="space-y-5" novalidate @submit.prevent="submit">
                        <Input
                            id="name"
                            :model-value="form.name"
                            label="Name"
                            placeholder="Ada Lovelace"
                            autocomplete="name"
                            hint="This is only used in the confirmation message."
                            required
                            :error="errorFor('name')"
                            @update:model-value="update('name', $event)"
                            @blur="touch('name')"
                        />

                        <Input
                            id="email"
                            :model-value="form.email"
                            type="email"
                            label="Email"
                            placeholder="ada@example.com"
                            autocomplete="email"
                            required
                            :error="errorFor('email')"
                            @update:model-value="update('email', $event)"
                            @blur="touch('email')"
                        />

                        <Input
                            id="subject"
                            :model-value="form.subject"
                            label="Subject"
                            placeholder="What would you like to ask?"
                            required
                            :error="errorFor('subject')"
                            @update:model-value="update('subject', $event)"
                            @blur="touch('subject')"
                        />

                        <div
                            class="flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <p class="text-xs text-neutral-500">
                                No data is stored by this example.
                            </p>
                            <Button type="submit" :loading="processing" :disabled="processing">
                                {{ processing ? 'Sending…' : 'Send message' }}
                            </Button>
                        </div>
                    </form>
                </div>

                <aside class="space-y-4">
                    <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <h2 class="text-sm font-semibold text-neutral-900">How it works</h2>
                        <ol class="mt-4 space-y-4">
                            <li class="flex gap-3">
                                <span
                                    class="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700"
                                >
                                    1
                                </span>
                                <div>
                                    <p class="text-sm font-medium text-neutral-900">Validate in the browser</p>
                                    <p class="mt-1 text-sm leading-6 text-neutral-600">
                                        The composable checks each field before sending the request.
                                    </p>
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span
                                    class="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700"
                                >
                                    2
                                </span>
                                <div>
                                    <p class="text-sm font-medium text-neutral-900">Validate in Laravel</p>
                                    <p class="mt-1 text-sm leading-6 text-neutral-600">
                                        A FormRequest applies the same rules and returns standard error messages.
                                    </p>
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span
                                    class="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700"
                                >
                                    3
                                </span>
                                <div>
                                    <p class="text-sm font-medium text-neutral-900">Show the result</p>
                                    <p class="mt-1 text-sm leading-6 text-neutral-600">
                                        Inertia shares the server errors and flash message with the page.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div class="rounded-2xl bg-neutral-950 p-6 shadow-sm">
                        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                            Server rules
                        </p>
                        <pre
                            class="mt-3 overflow-x-auto text-[12px] leading-6 text-neutral-300"
                        ><code>{{ serverRules }}</code></pre>
                    </div>
                </aside>
            </div>
        </section>
    </AppLayout>
</template>
