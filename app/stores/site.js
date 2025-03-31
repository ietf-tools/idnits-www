import { defineStore } from 'pinia'
import { getAllValidations, MODES, ALLOWED_DOMAINS_DEFAULT } from '@ietf-tools/idnits'

export const useSiteStore = defineStore('site', {
  state: () => ({
    offline: false,
    mode: MODES.NORMAL,
    nits: [],
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
          year: new Date().getFullYear()
        }
      }

      const validations = getAllValidations(ext)

      try {
        let grpIdx = 0
        let taskIdx = 0
        for (const valGroup of validations) {
          this.resultGroups.push({
            key: valGroup.key,
            title: valGroup.title,
            tasks: []
          })
          for (const valTask of valGroup.tasks) {
            const taskResults = await valTask.task(ctx)
            const taskObj = {
              key: valTask.key,
              title: valTask.title,
              nits: [],
              group: grpIdx
            }
            this.resultGroups[grpIdx].tasks.push(taskObj)
            this.results.push(taskObj)
            if (!valTask.isVoid && Array.isArray(taskResults)) {
              for (const taskResult of taskResults) {
                const nit = {
                  taskIdx,
                  ...taskResult
                }
                this.results[taskIdx].nits.push(nit)
                this.nits.push(nit)
              }
            }
            taskIdx++
          }
          grpIdx++
        }
      } catch (err) {
        console.warn(err)
        this.error = err.message
      }
      console.info(this.results)
    }
  },
  persist: {
    pick: ['offline', 'mode']
  }
})
