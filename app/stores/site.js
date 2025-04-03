import { defineStore } from 'pinia'
import { getAllValidations, MODES, ALLOWED_DOMAINS_DEFAULT } from '@ietf-tools/idnits'

export const useSiteStore = defineStore('site', {
  state: () => ({
    theme: 'system',
    showPerf: true,
    offline: false,
    mode: MODES.NORMAL,
    useCurrentYear: true,
    customYear: new Date().getFullYear(),
    results: [],
    resultGroups: [],
    filename: '',
    history: [],
    error: ''
  }),
  actions: {
    async validate(raw, filename) {
      this.results = []
      this.resultGroups = []
      this.nits = []
      this.filename = filename
      this.error = ''

      const ext = filename.endsWith('.xml') ? 'xml' : 'txt'
      const ctx = {
        raw,
        filename,
        options: {
          allowedDomains: ALLOWED_DOMAINS_DEFAULT,
          mode: this.mode,
          offline: this.offline,
          year: this.useCurrentYear ? new Date().getFullYear() : this.customYear
        }
      }

      const validations = getAllValidations(ext)

      try {
        let grpIdx = 0
        let taskIdx = 0
        for (const valGroup of validations) {
          performance.mark(`${valGroup.key}_start`)
          this.resultGroups.push({
            key: valGroup.key,
            title: valGroup.title,
            tasks: [],
            nitsTotal: 0,
            perf: '-',
            state: 'pending'
          })
          for (const valTask of valGroup.tasks) {
            performance.mark(`${valTask.key}_start`)
            try {
              const taskObj = {
                key: valTask.key,
                title: valTask.title,
                nits: [],
                group: grpIdx,
                perf: '-',
                state: 'pending'
              }
              this.resultGroups[grpIdx].tasks.push(taskObj)
              this.results.push(taskObj)
              const taskResults = await valTask.task(ctx)
              if (!valTask.isVoid && Array.isArray(taskResults)) {
                this.results[taskIdx].nits.push(...taskResults)
                this.resultGroups[grpIdx].nitsTotal += taskResults.length
              }
              this.results[taskIdx].state = 'completed'
            } catch (err) {
              this.results[taskIdx].state = 'failed'
              this.resultGroups[grpIdx].state = 'failed'
              throw err
            }
            performance.mark(`${valTask.key}_end`)
            this.results[taskIdx].perf = +performance.measure(valTask.key, `${valTask.key}_start`, `${valTask.key}_end`).duration.toFixed(2)
            taskIdx++
          }
          performance.mark(`${valGroup.key}_end`)
          this.resultGroups[grpIdx].perf = +performance.measure(valGroup.key, `${valGroup.key}_start`, `${valGroup.key}_end`).duration.toFixed(2)
          this.resultGroups[grpIdx].state = 'completed'
          grpIdx++
        }
      } catch (err) {
        console.warn(err)
        this.error = err.message
      }
    }
  },
  persist: {
    pick: ['theme', 'showPerf', 'offline', 'mode', 'useCurrentYear', 'customYear']
  }
})
