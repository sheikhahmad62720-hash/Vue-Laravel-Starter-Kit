<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { routes } from '@/lib/routes';

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface Directory {
    path: string;
    description: string;
}

const stack = ['Laravel 13', 'Vue 3', 'Inertia', 'TypeScript', 'Tailwind CSS 4', 'Vite'];

const features: Feature[] = [
    {
        title: 'Server-driven pages',
        description:
            'Inertia connects Laravel controllers to Vue pages without an API layer, while keeping routing and validation on the backend.',
        icon: 'M6.429 9.75 2.25 12l4.179 2.25m11.142 0L21.75 12l-4.179-2.25M14.25 4.5l-4.5 15',
    },
    {
        title: 'Typed from the start',
        description:
            'Strict TypeScript, shared types, and vue-tsc in the build keep your pages and components honest as the project grows.',
        icon: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
    },
    {
        title: 'A small design system',
        description:
            'Tailwind CSS 4 is configured through Vite, with a reusable Button and Input seeded as a foundation for your own UI.',
        icon: 'M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a16 16 0 0 0 3.388-1.62m-5.043-.025a16 16 0 0 1 1.622-3.395m3.42 3.42a16 16 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a16 16 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42',
    },
];

const directories: Directory[] = [
    { path: 'components/', description: 'Reusable UI building blocks.' },
    { path: 'layouts/', description: 'Shared shells and navigation.' },
    { path: 'pages/', description: 'Inertia page components.' },
    { path: 'types/', description: 'Shared TypeScript definitions.' },
    { path: 'composables/', description: 'Reusable stateful logic.' },
    { path: 'lib/', description: 'Framework-agnostic frontend utilities.' },
];

const projectTree = `resources/js/
├── components/
│   └── ui/
│       ├── Button.vue
│       └── Input.vue
├── composables/
│   ├── useContactForm.ts
│   └── useFlash.ts
├── layouts/
│   └── AppLayout.vue
├── lib/
│   ├── routes.ts
│   ├── utils.ts
│   └── validation.ts
├── pages/
│   ├── ExampleForm.vue
│   └── Welcome.vue
├── types/
│   └── index.ts
└── app.ts`;
</script>

<template>
    <AppLayout>
        <Head title="Welcome" />

        <section class="relative overflow-hidden border-b border-neutral-200">
            <div class="pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                    class="absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-200/50 blur-3xl"
                ></div>
                <div class="absolute inset-0 bg-linear-to-b from-transparent via-neutral-50/30 to-neutral-50"></div>
            </div>

            <div class="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div class="max-w-3xl">
                    <span
                        class="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
                    >
                        <span class="size-1.5 rounded-full bg-indigo-500"></span>
                        Laravel 13 · Vue 3 · TypeScript
                    </span>

                    <h1
                        class="mt-6 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl"
                    >
                        A clean foundation for your next
                        <span class="text-indigo-600">Laravel + Vue</span> project.
                    </h1>

                    <p class="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                        Inertia, TypeScript, and Tailwind CSS 4 are already wired together. Start with a
                        structure that stays out of your way.
                    </p>

                    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button :href="routes.exampleForm" size="lg">Try the example form</Button>
                        <Button href="#project-structure" variant="secondary" size="lg">
                            See the structure
                        </Button>
                    </div>

                    <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
                        <li v-for="item in stack" :key="item" class="flex items-center gap-2">
                            <svg
                                class="size-4 text-indigo-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="feature in features"
                    :key="feature.title"
                    class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                    <div class="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                        <svg
                            class="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path :d="feature.icon" />
                        </svg>
                    </div>
                    <h2 class="mt-5 text-base font-semibold text-neutral-900">{{ feature.title }}</h2>
                    <p class="mt-2 text-sm leading-6 text-neutral-600">{{ feature.description }}</p>
                </article>
            </div>
        </section>

        <section id="project-structure" class="border-y border-neutral-200 bg-white">
            <div
                class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20"
            >
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
                        Project structure
                    </p>
                    <h2 class="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
                        Everything has a home.
                    </h2>
                    <p class="mt-4 text-base leading-7 text-neutral-600">
                        Frontend code lives under <code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">resources/js</code>.
                        Each directory has one clear purpose, so features stay easy to find and easy to remove.
                    </p>

                    <ul class="mt-8 space-y-3">
                        <li
                            v-for="directory in directories"
                            :key="directory.path"
                            class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                            <code
                                class="w-32 shrink-0 font-mono text-sm font-medium text-indigo-700"
                            >
                                {{ directory.path }}
                            </code>
                            <span class="text-sm text-neutral-600">{{ directory.description }}</span>
                        </li>
                    </ul>
                </div>

                <div class="overflow-hidden rounded-2xl bg-neutral-950 shadow-xl ring-1 ring-neutral-900/10">
                    <div class="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                        <span class="size-2.5 rounded-full bg-red-400/80"></span>
                        <span class="size-2.5 rounded-full bg-amber-400/80"></span>
                        <span class="size-2.5 rounded-full bg-emerald-400/80"></span>
                        <span class="ml-2 text-xs text-neutral-400">resources/js</span>
                    </div>
                    <pre class="overflow-x-auto p-5 text-[13px] leading-6 text-neutral-300"><code>{{ projectTree }}</code></pre>
                </div>
            </div>
        </section>

        <section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div
                class="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between"
            >
                <div>
                    <h2 class="text-2xl font-semibold tracking-tight text-neutral-950">
                        Ready to make it yours?
                    </h2>
                    <p class="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                        Open the example form to see validation, shared layout, and reusable components
                        working together.
                    </p>
                </div>
                <Button :href="routes.exampleForm" class="mt-6 shrink-0 lg:mt-0">
                    Open the form
                </Button>
            </div>
        </section>
    </AppLayout>
</template>
