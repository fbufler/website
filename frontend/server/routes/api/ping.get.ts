import { activeVisitors, visitorLastSeen } from '../../utils/metrics'

const TTL = 60_000 // 60 seconds

export default defineEventHandler((event) => {
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ??
    event.node.req.socket.remoteAddress ??
    'unknown'

  const now = Date.now()
  visitorLastSeen.set(ip, now)

  // evict stale entries and update gauge
  for (const [key, ts] of visitorLastSeen) {
    if (now - ts > TTL) visitorLastSeen.delete(key)
  }
  activeVisitors.set(visitorLastSeen.size)

  setResponseStatus(event, 204)
})
