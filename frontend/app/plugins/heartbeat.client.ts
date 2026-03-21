export default defineNuxtPlugin(() => {
  let interval: ReturnType<typeof setInterval> | null = null

  const router = useRouter()
  const ping = () => fetch(`/api/ping?page=${encodeURIComponent(router.currentRoute.value.path)}`).catch(() => {})

  const start = () => {
    if (interval) return
    ping()
    interval = setInterval(ping, 30_000)
  }

  const stop = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  const onVisibilityChange = () => {
    document.visibilityState === 'visible' ? start() : stop()
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  start()
})
