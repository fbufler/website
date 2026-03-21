import { httpRequestsTotal, httpRequestDuration, httpActiveRequests } from '../utils/metrics'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    event.context._startTime = performance.now()
    httpActiveRequests.inc()
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    httpActiveRequests.dec()

    const route = event.path.split('?')[0]
    if (route === '/metrics') return

    const duration = (performance.now() - (event.context._startTime ?? performance.now())) / 1000
    const status = String(event.node.res.statusCode)
    const method = event.method

    httpRequestsTotal.inc({ method, route, status })
    httpRequestDuration.observe({ method, route, status }, duration)
  })
})
