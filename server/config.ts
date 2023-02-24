import * as dotenv from 'dotenv'
dotenv.config()

const DEBUG = process.env.SERVER_DEBUG === 'true' || process.env.SERVER_DEBUG === '1'
const config = {
  debug: DEBUG,
  provider: process.env.PROVIDER,
  dcContract: process.env.DC_CONTRACT,
  easContract: process.env.EAS_CONTRACT,
  improvMX: {
    apiRoot: process.env.IMPROV_MX_API_ROOT,
    mx: JSON.parse(process.env.IMPROV_MX_DNS_RECORDS ?? '[]')
  },
  verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
  https: {
    only: process.env.HTTPS_ONLY === 'true' || process.env.HTTPS_ONLY === '1',
    key: DEBUG ? './certs/test.key' : './certs/privkey.pem',
    cert: DEBUG ? './certs/test.cert' : './certs/fullchain.pem'
  },
  corsOrigins: process.env.CORS ?? '',

  // redis[s]://[[username][:password]@][host][:port][/db-number]
  redis: { url: process.env.REDIS_URL }
}
export default config
