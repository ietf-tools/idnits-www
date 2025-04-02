<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-cog" />
        <h1 class="flex items-center gap-1.5 font-semibold text-(--ui-text-highlighted) truncate">Validation Results</h1>
      </div>
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <div v-if="siteStore.error">
        <UAlert
          title="Fatal Error"
          :description="siteStore.error"
          icon="i-lucide-circle-x"
          color="error"
          :ui="{
            icon: 'text-3xl'
          }"
        />
      </div>
      <div class="col-span-1 flex rounded-md shadow-sm dark:shadow-white/5">
        <div :class="['bg-pink-600 flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">{{ fileExt }}</div>
        <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <div class="flex-1 truncate px-4 py-2 text-sm">
            <strong class="font-medium text-zinc-900 dark:text-zinc-300">{{ siteStore.filename }}</strong>
            <p class="text-zinc-400">Validation Mode: <strong>{{ validationModes[siteStore.mode] }}</strong></p>
          </div>
          <div class="shrink-0 pr-2">
            <UTabs
              v-model="selectedSeverity"
              :items="severities"
              class="w-90"
              :content="false"
              size="sm"
            />
          </div>
        </div>
      </div>

      <div v-for="grp of siteStore.resultGroups" :key="grp.key" class="pb-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700 rounded-md shadow-sm dark:shadow-white/5">
        <div class="px-4 py-5 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div class="flex items-center justify-between pl-1">
            <UIcon class="mr-2" name="i-lucide-list-tree" />
            <h3 class="text-base font-semibold text-zinc-500 dark:text-zinc-200">{{ grp.title }}</h3>
          </div>
          <div class="shrink-0">
            Test
          </div>
        </div>
        <div class="overflow-y-auto divide-y divide-(--ui-border) bg-zinc-50 dark:bg-zinc-800">
          <div v-for="task of grp.tasks" :key="task.key">
            <div
              class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors flex items-center"
              :class="[
                task.nits.length > 0 ? 'text-error-600 dark:text-error-400 border-error-500 bg-error-500/10' : 'text-success-700 dark:text-success-200 border-success-500 bg-success-500/10',
                selectedTaskKey === task.key ? 'border-(--ui-primary) bg-(--ui-primary)/10' : 'border-(--ui-bg) hover:border-(--ui-primary) hover:bg-(--ui-primary)/5'
              ]"
              @click="selectedTaskKey = task.key"
            >
              <UIcon v-if="task.nits.length > 0" name="i-lucide-triangle-alert" size="18" class="mr-2" />
              <UIcon v-else name="i-lucide-circle-check" size="18" class="mr-2 text-success-500" />
              <span class="font-semibold">{{ task.title }}</span>
              <div class="flex-auto" />
              <UBadge variant="solid" :color="task.nits.length > 0 ? 'error' : 'success'" :label="task.nits.length || '0'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MODES } from '@ietf-tools/idnits'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

const validationModes = {
  [MODES.NORMAL]: 'Normal',
  [MODES.FORGIVE_CHECKLIST]: 'Forgive Checklist',
  [MODES.SUBMISSION]: 'Submission'
}

const severities = [{
  label: 'All',
  value: 'all'
}, {
  label: 'Errors',
  value: 'errors'
}, {
  label: 'Warnings',
  value: 'warnings'
}, {
  label: 'Comments',
  value: 'comments'
}]
const selectedSeverity = ref('all')

const selectedTaskKey = ref('')

const fileExt = computed(() => {
  return siteStore.filename?.split('.').at(-1).toUpperCase() || '???'
})
</script>
