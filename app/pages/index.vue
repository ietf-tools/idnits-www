<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Overview" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageHero
        title="I-D Nits"
        description="This tool inspects Internet-Draft (I-D) documents for conditions that should be adjusted to bring the document into line with policies from the IETF, the IETF Trust, and the RFC Editor."
        headline="v3.0.0"
        orientation="horizontal"
        :links="heroLinks"
      >
        <img src="~/assets/img/logo.svg" alt="" style="max-height: 15em;">
      </UPageHero>
      <USeparator label="Built with ❤️ by the IETF Tools Team" />
      <UNavigationMenu color="neutral" :items="footerLinks" class="w-full justify-center" />
    </template>
  </UDashboardPanel>
</template>

<script setup>
const heroLinks = ref([
  {
    label: 'Validate File',
    to: '/upload',
    icon: 'i-lucide-file-up'
  },
  {
    label: 'Validate Remote URL',
    to: '/remote',
    color: 'secondary',
    icon: 'i-lucide-cloud-download'
  }
])

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