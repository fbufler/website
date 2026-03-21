import { NodeSDK } from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

export default defineNitroPlugin(() => {
  if (process.env.NODE_ENV !== 'production') return

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN)

  // OTEL_EXPORTER_OTLP_ENDPOINT env var is read automatically by the exporter
  // and /v1/traces is appended. Do not pass url explicitly.
  const exporter = new OTLPTraceExporter()

  const sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  })

  sdk.start()

  process.on('SIGTERM', () => sdk.shutdown())
})
