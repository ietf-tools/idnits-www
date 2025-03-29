<template>
  <UDashboardPanel id="remote">
    <template #header>
      <UDashboardNavbar title="Validate Remote URL" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UColorModeButton />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <span>This service inspects Internet-Draft (I-D) documents for conditions that should be adjusted to bring the document into line with policies from the IETF, the IETF Trust, and the RFC Editor.</span>
    </template>
  </UDashboardPanel>
</template>
