<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-house" />
        <h1 class="flex items-center gap-1.5 font-semibold text-(--ui-text-highlighted) truncate">Overview</h1>
      </div>
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <div data-orientation="horizontal" class="relative isolate">
        <div class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24 lg:grid-cols-2 lg:items-center">
          <div class="">
            <div class="mb-4 font-semibold text-(--ui-primary) flex items-center gap-1.5">v{{ runtimeConfig.public.idnitsVersion }}</div>
            <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)">I-D Nits</h1>
            <div class="text-lg sm:text-xl/8 text-(--ui-text-muted) text-pretty mt-6">This tool inspects Internet-Draft (I-D) documents for conditions that should be adjusted to bring the document into line with policies from the IETF, the IETF Trust, and the RFC Editor.</div>
            <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <UButton to="/upload" label="Validate File" icon="i-lucide-file-up" color="primary" size="xl" />
              <UButton to="/remote" label="Validate Remote URL" icon="i-lucide-cloud-download" color="secondary" size="xl" />
            </div>
          </div>
          <img src="~/assets/img/logo.svg" alt="" style="max-height: 15em;">
        </div>
      </div>
      <USeparator label="Built with ❤️ by the IETF Tools Team" />
      <UNavigationMenu color="neutral" :items="footerLinks" class="w-full justify-center" />
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

const footerLinks = ref([
  {
    label: 'IETF',
    to: 'https://www.ietf.org',
    icon: 'i-lucide-layers'
  },
  {
    label: 'Datatracker',
    to: 'https://datatracker.ietf.org',
    icon: 'i-lucide-database'
  },
  {
    label: 'Mail Archive',
    to: 'https://mailarchive.ietf.org',
    icon: 'i-lucide-mail-search'
  },
  {
    label: 'RFC Editor',
    to: 'https://www.rfc-editor.org',
    icon: 'i-lucide-notepad-text'
  },
  {
    label: 'System Status',
    to: 'https://status.ietf.org',
    icon: 'i-lucide-laptop-minimal-check'
  }
])
</script>
