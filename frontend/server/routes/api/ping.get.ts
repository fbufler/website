import { activeVisitors, visitorLastSeen, pageViews } from '../../utils/metrics'

const TTL = 60_000 // 60 seconds

export default defineEventHandler((event) => {
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ??
    event.node.req.socket.remoteAddress ??
    'unknown'

  const page = getQuery(event).page as string | undefined

  const now = Date.now()
  visitorLastSeen.set(ip, now)

  // evict stale entries and update gauge
  for (const [key, ts] of visitorLastSeen) {
    if (now - ts > TTL) visitorLastSeen.delete(key)
  }
  activeVisitors.set(visitorLastSeen.size)

  if (page) pageViews.inc({ page })

  setResponseStatus(event, 204)
})
