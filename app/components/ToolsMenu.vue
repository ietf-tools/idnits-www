<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        label: collapsed ? undefined : 'idnits',
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      :avatar="{
        src: '/logo.svg'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-(--ui-text-dimmed)'
      }"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const items = [
  {
    label: 'idnits',
    // icon: 'i-lucide-radar',
    avatar: {
      src: '/logo.svg'
    }
  },
  {
    label: 'iddiff',
    icon: 'i-lucide-square-split-horizontal',
    to: 'https://author-tools.ietf.org/iddiff'
  },
  {
    label: 'svgcheck',
    icon: 'i-lucide-image-up',
    to: 'https://author-tools.ietf.org/svgcheck'
  },
  {
    label: 'Datatracker',
    icon: 'i-lucide-database',
    to: 'https://datatracker.ietf.org'
  },
  {
    label: 'Mail Archive',
    icon: 'i-lucide-mail-search',
    to: 'https://mailarchive.ietf.org'
  }
]
</script>