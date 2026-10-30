<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import Button from '@/components/ui/Button.vue';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

const page = usePage();
const mobileMenuOpen = ref(false);

const navigation = [
    { label: 'Home', href: routes.home },
    { label: 'Example form', href: routes.exampleForm },
];

function isActive(href: string): boolean {
    const path = page.url.split('?')[0];

    return href === routes.home ? path === routes.home : path.startsWith(href);
}

watch(
    () => page.url,
    () => {
        mobileMenuOpen.value = false;
    },
);
</script>

<template>
    <div class="flex min-h-screen flex-col bg-neutral-50">
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-lg"
        >
            Skip to content
        </a>

        <header class="sticky top-0 z-40 border-b border-neutral-200/80 bg-neutral-50/80 backdrop-blur">
            <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    :href="routes.home"
                    class="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                    <span class="grid size-9 place-items-center rounded-xl bg-neutral-900 text-sm font-semibold text-white">
                        LV
                    </span>
                    <span class="flex flex-col leading-none">
                        <span class="text-sm font-semibold tracking-tight text-neutral-900">
                            Laravel + Vue
                        </span>
                        <span class="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                            Starter kit
                        </span>
                    </span>
                </Link>

                <nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    <Link
                        v-for="item in navigation"
                        :key="item.href"
                        :href="item.href"
                        :class="
                            cn(
                                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive(item.href)
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
                            )
                        "
                    >
                        {{ item.label }}
                    </Link>
                </nav>

                <div class="hidden md:block">
                    <Button :href="routes.exampleForm" size="sm">Try the form</Button>
                </div>

                <button
                    type="button"
                    class="grid size-10 place-items-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 md:hidden"
                    :aria-expanded="mobileMenuOpen"
                    aria-controls="mobile-menu"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                >
                    <span class="sr-only">{{ mobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
                    <svg
                        v-if="!mobileMenuOpen"
                        class="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                    <svg
                        v-else
                        class="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            </div>

            <div v-if="mobileMenuOpen" id="mobile-menu" class="border-t border-neutral-200 bg-white md:hidden">
                <nav class="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
                    <Link
                        v-for="item in navigation"
                        :key="item.href"
                        :href="item.href"
                        :class="
                            cn(
                                'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                isActive(item.href)
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                            )
                        "
                        @click="mobileMenuOpen = false"
                    >
                        {{ item.label }}
                    </Link>
                    <Button :href="routes.exampleForm" size="sm" block class="mt-2">
                        Try the form
                    </Button>
                </nav>
            </div>
        </header>

        <main id="main-content" class="flex-1">
            <slot />
        </main>

        <footer class="border-t border-neutral-200 bg-white">
            <div
                class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
            >
                <p class="text-sm text-neutral-500">
                    A minimal foundation for Laravel and Vue projects.
                </p>

                <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <a
                        href="https://laravel.com/docs"
                        target="_blank"
                        rel="noreferrer"
                        class="text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                        Laravel docs
                    </a>
                    <a
                        href="https://inertiajs.com"
                        target="_blank"
                        rel="noreferrer"
                        class="text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                        Inertia docs
                    </a>
                    <a
                        href="https://vuejs.org"
                        target="_blank"
                        rel="noreferrer"
                        class="text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                        Vue docs
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>
