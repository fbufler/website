import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node'
import { trace, context, SpanKind, SpanStatusCode } from '@opentelemetry/api'

export default defineNitroPlugin((nitroApp) => {
  if (process.env.NODE_ENV !== 'production') return

  const exporter = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    ? new OTLPTraceExporter()
    : new ConsoleSpanExporter()

  const sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [],
  })

  sdk.start()
  console.log('[tracing] SDK started, exporter:', exporter.constructor.name)

  process.on('SIGTERM', () => sdk.shutdown())

  const tracer = trace.getTracer('fbufler')

  nitroApp.hooks.hook('request', (event) => {
    const route = event.path.split('?')[0]
    if (route === '/metrics' || route === '/api/ping') return

    const span = tracer.startSpan(`HTTP ${event.method} ${route}`, {
      kind: SpanKind.SERVER,
      attributes: {
        'http.method': event.method,
        'http.url': event.path,
        'http.route': route,
      },
    })

    event.context._span = span
    event.context._traceCtx = trace.setSpan(context.active(), span)
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    const span = event.context._span
    if (!span) return

    const status = event.node.res.statusCode
    span.setAttribute('http.status_code', status)
    span.setStatus(status >= 400 ? { code: SpanStatusCode.ERROR } : { code: SpanStatusCode.OK })
    span.end()
  })
})
