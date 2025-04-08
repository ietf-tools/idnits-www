export default defineNuxtRouteMiddleware(async (to, from) => {
  // Don't run on server
  if (import.meta.server) {
    return
  }

  // Redirect to homepage if first load without URL
  if (!from.name && !to.query.url) {
    return navigateTo('/')
  }

  // Only run on first load
  if (from.name) {
    return
  }

  const siteStore = useSiteStore()

  try {
    const docData = await siteStore.fetchRemoteDoc(to.query.url)
    siteStore.validate(docData[0], docData[1])
    return
  } catch (err) {
    siteStore.error = err.message
    siteStore.fetching = false
  }
})
