import { register } from '../utils/metrics'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', register.contentType)
  return register.metrics()
})
