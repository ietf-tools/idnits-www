<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'idnits'
const description = 'This service inspects Internet-Draft (I-D) documents for conditions that should be adjusted to bring the document into line with policies from the IETF, the IETF Trust, and the RFC Editor.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://author-tools.ietf.org/idnits3/social-card.png',
  twitterImage: 'https://author-tools.ietf.org/idnits3/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>
