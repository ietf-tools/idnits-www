import { defineStore } from 'pinia'
import { getAllValidations, MODES, ALLOWED_DOMAINS_DEFAULT } from '@ietf-tools/idnits'

export const useSiteStore = defineStore('site', {
  state: () => ({
    offline: false,
    defaultValidationMode: MODES.NORMAL,
    mode: MODES.NORMAL,
    nits: [],
    results: [],
    filename: '',
    history: [],
    error: ''
  }),
  actions: {
    async validate(raw, filename) {
      this.results = []
      this.nits = []

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

      // let idx = 0
      try {
        for (const valGroup of validations) {
          for (const valTask of valGroup.tasks) {
            const taskResult = await valTask.task(ctx)
            console.info(ctx)
            if (!valTask.isVoid && Array.isArray(taskResult)) {
              this.results.push(...taskResult)
            }
          }
        }
      } catch (err) {
        this.error = err.message
      }
      console.info(this.results)
    }
  },
  persist: {
    pick: ['offline', 'defaultValidationMode']
  }
})
