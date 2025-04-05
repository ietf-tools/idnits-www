export default defineNitroConfig({
  compatibilityDate: '2024-09-19',
  preset: 'cloudflare_module',
  output: {
    dir: '.output',
    serverDir: '.output/server',
    publicDir: '.output/public/idnits3'
  }
})
