import { collectDefaultMetrics, Registry, Counter, Histogram, Gauge } from 'prom-client'

export const register = new Registry()

collectDefaultMetrics({ register })

export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
})

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [register],
})

export const httpActiveRequests = new Gauge({
  name: 'http_active_requests',
  help: 'Currently active HTTP requests',
  registers: [register],
})

export const activeVisitors = new Gauge({
  name: 'active_visitors',
  help: 'Visitors active in the last 60 seconds',
  registers: [register],
})

export const visitorLastSeen = new Map<string, number>()

export const pageViews = new Counter({
  name: 'page_views_total',
  help: 'Client-side page views by route',
  labelNames: ['page'],
  registers: [register],
})
