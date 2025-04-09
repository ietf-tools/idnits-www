<template>
  <div class="flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) flex-1">
    <div class="h-18 shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-list-checks" />
        <h1 class="flex flex-col items-left font-semibold truncate">
          <span class="lg:hidden text-xs text-primary-500 uppercase">idnits</span>
          Validation Results
        </h1>
      </div>
      <ToggleMobileMenuBtn />
    </div>

    <div v-if="siteStore.fetching">
      <UProgress size="2xs" :ui="{ base: 'rounded-none' }" />
      <div class="flex items-center p-6 gap-4">
        <UIcon name="i-lucide-cloud-download" class="text-2xl" />
        <div class="flex flex-col">
          <span class="italic">Fetching remote document</span>
          <span class="text-xs text-primary-500">Please wait...</span>
        </div>
      </div>
    </div>

    <div v-if="siteStore.error" class="p-6 pb-0">
      <UAlert
        title="Fatal Error"
        :description="siteStore.error"
        icon="i-lucide-octagon-x"
        color="error"
        :ui="{
          icon: 'text-3xl'
        }"
      />
    </div>

    <div v-if="siteStore.filename" class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <div class="col-span-1 flex rounded-md shadow-sm dark:shadow-white/5">
        <div :class="['bg-secondary-500 flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">
          <UIcon v-if="siteStore.validating" name="i-lucide-circle-dashed" class="text-white text-3xl animate-spin" />
          <span v-else>{{ fileExt }}</span>
        </div>
        <div class="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <div class="flex-1 truncate px-4 py-2 text-sm">
            <strong class="font-medium text-zinc-900 dark:text-zinc-300">{{ siteStore.filename }}</strong>
            <p class="text-zinc-400">Validation Mode: <strong>{{ validationModes[siteStore.mode] }}</strong></p>
          </div>
        </div>
      </div>

      <div v-if="siteStore.nitsTotal > 0">
        <UAlert
          v-if="siteStore.nitsByType.error > 0"
          title="Document has nits"
          :description="'Review the ' + siteStore.nitsByType.error + ' error(s) listed below. ' + (siteStore.nitsByType.warning > 0 ? 'There are ' + siteStore.nitsByType.warning + ' warning(s). ' : '') + (siteStore.nitsByType.comment > 0 ? 'Also, there are ' + siteStore.nitsByType.comment + ' comment(s).' : '')"
          icon="i-lucide-octagon-alert"
          color="error"
          variant="subtle"
          :ui="{
            icon: 'text-3xl'
          }"
        />
        <UAlert
          v-else-if="siteStore.nitsByType.warning > 0"
          title="Document has nits, just a few warnings!"
          :description="'Review the ' + siteStore.nitsByType.warning + ' warning(s) listed below. ' + (siteStore.nitsByType.comment > 0 ? 'Also, there are ' + siteStore.nitsByType.comment + ' comment(s).' : '')"
          icon="i-lucide-triangle-alert"
          color="warning"
          variant="subtle"
          :ui="{
            icon: 'text-3xl'
          }"
        />
        <UAlert
          v-else
          title="Document has nits"
          :description="'Review the ' + siteStore.nitsByType.comment + ' comment(s) listed below.'"
          icon="i-lucide-message-circle-warning"
          color="info"
          variant="subtle"
          :ui="{
            icon: 'text-3xl'
          }"
        />
        <UAlert
          v-if="viewport.isLessThan('tablet')"
          size="xs"
          class="mt-4"
          title="Limited View"
          description="Run on desktop / tablet to get more detailed insights about each nit."
          icon="i-lucide-monitor-smartphone"
          color="warning"
          variant="outline"
          :ui="{
            icon: 'text-3xl'
          }"
        />
      </div>
      <div v-else>
        <UAlert
          title="Document is valid!"
          description="No nits found during validation."
          icon="i-lucide-party-popper"
          color="success"
          variant="subtle"
          :ui="{
            icon: 'text-3xl'
          }"
        />
      </div>

      <div v-for="grp of siteStore.resultGroups" :key="grp.key" class="pb-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700 rounded-md shadow-sm dark:shadow-white/5">
        <div class="px-4 sm:pr-6 py-5 flex items-center justify-between sm:flex-nowrap">
          <div class="flex items-center justify-between px-1 truncate">
            <UIcon class="mr-2" name="i-lucide-list-tree" />
            <h3 class="text-base font-semibold truncate text-zinc-500 dark:text-zinc-200">{{ grp.title }}</h3>
          </div>
          <div class="shrink-0 text-xs flex items-center">
            <span v-if="siteStore.showPerf" class="hidden md:block mr-2">{{ grp.perf }} ms</span>
            <UBadge :variant="grp.nitsTotal > 0 ? 'solid' : 'soft'" :color="grp.nitsTotal > 0 ? 'error' : 'success'" :label="grp.nitsTotal || '0'" />
          </div>
        </div>
        <UProgress v-if="grp.state === 'pending'" size="2xs" />
        <div class="overflow-y-auto divide-y divide-(--ui-border) bg-zinc-50 dark:bg-zinc-800">
          <div v-for="task of grp.tasks" :key="task.key">
            <div
              class="p-4 sm:px-6 text-sm border-l-2 transition-colors flex items-center"
              :class="[
                task.nits.length > 0 || task.state === 'failed' ? 'border-2 text-white dark:text-error-50 border-error-500 bg-error-600/70 dark:bg-error-500/50' : 'text-success-700 dark:text-success-200 border-success-500 bg-success-500/10'
              ]"
            >
              <UIcon v-if="task.nits.length > 0 || task.state === 'failed'" name="i-lucide-triangle-alert" size="18" class="mr-2" />
              <UIcon v-else name="i-lucide-circle-check" size="18" class="mr-2 text-success-500" />
              <span class="font-semibold">{{ task.title }}</span>
              <div class="flex-auto" />
              <UIcon v-if="task.state === 'pending'" name="i-lucide-circle-dashed" class="animate-spin mr-2" />
              <span v-if="siteStore.showPerf && task.state === 'completed'" class="hidden md:block text-xs mr-2 text-black/60 dark:text-white/60">{{ task.perf }} ms</span>
              <UBadge :variant="task.nits.length > 0 || task.state === 'failed' ? 'solid' : 'soft'" :color="task.nits.length > 0 || task.state === 'failed' ? 'error' : 'success'" :label="task.nits.length || '0'" />
            </div>
            <div v-if="task.state === 'completed' && task.nits.length > 0" class="flex flex-col gap-2 bg-error-500/20 py-2 px-2 text-sm">
              <div v-for="(nit, idx) of task.nits" :key="idx" class="bg-white/50 dark:bg-black/20 rounded-md p-4">
                <!-- Mobile View -->
                <div v-if="viewport.isLessThan('tablet')" class="flex flex-col">
                  <div class="flex items-center">
                    <UBadge :label="getNitType(nit).name" variant="soft" :color="getNitType(nit).color" class="mr-2 font-bold" />
                    <UBadge :label="nit.name" variant="soft" color="error" class="mr-2 text-error-800 dark:text-error-200 truncate" />
                  </div>
                  <div class="mt-2">{{ nit.message }}</div>
                </div>
                <!-- Desktop view -->
                <template v-else>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center pr-2">
                      <UBadge :label="getNitType(nit).name" variant="soft" :color="getNitType(nit).color" class="mr-2 font-bold" />
                      <UBadge :label="nit.name" variant="soft" color="error" class="mr-2 text-error-800 dark:text-error-200" />
                      <span>{{ nit.message }}</span>
                    </div>
                    <UButton v-if="nit.refUrl" :to="nit.refUrl" target="_blank" label="Ref" variant="subtle" color="neutral" icon="i-lucide-book-text" trailing-icon="i-lucide-arrow-up-right" />
                  </div>
                  <div v-if="nit.lines" class="flex items-center gap-2 mt-2 pl-2">
                    <span class="text-error-600 dark:text-error-100 text-xs">LINES |</span>
                    <UBadge v-for="(ln, lnIdx) of nit.lines" :key="lnIdx" size="sm" class="bg-black/50 text-white dark:text-error-100" :label="'Ln ' + ln.line + ', Col ' + ln.pos" />
                  </div>
                  <div v-if="nit.path" class="flex items-center mt-2 pl-2">
                    <span class="text-error-600 dark:text-error-100 text-xs mr-1">PATH |</span>
                    <UBadge class="font-mono bg-black/50 text-white dark:text-error-100" :label="nit.path" />
                  </div>
                  <div v-if="nit.text" class="flex items-center mt-2 pl-2">
                    <span class="text-error-600 dark:text-error-100 text-xs mr-1">TEXT |</span>
                    <div class="font-mono">{{ nit.text }}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MODES, ValidationComment, ValidationError, ValidationWarning } from '@ietf-tools/idnits'
import { useSiteStore } from '@/stores/site'

definePageMeta({
  middleware: ['results']
})

const viewport = useViewport()
const siteStore = useSiteStore()

const validationModes = {
  [MODES.NORMAL]: 'Normal',
  [MODES.FORGIVE_CHECKLIST]: 'Forgive Checklist',
  [MODES.SUBMISSION]: 'Submission'
}

const fileExt = computed(() => {
  return siteStore.filename?.split('.').at(-1).toUpperCase() || '???'
})

function getNitType(nit) {
  if (nit instanceof ValidationComment) {
    return {
      name: 'Comment',
      color: 'info'
    }
  } else if (nit instanceof ValidationError) {
    return {
      name: 'Error',
      color: 'error'
    }
  } else if (nit instanceof ValidationWarning) {
    return {
      name: 'Warning',
      color: 'warning'
    }
  } else {
    return {
      name: 'Unknown',
      color: 'neutral'
    }
  }
}
</script>
