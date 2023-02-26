import { getDomain, addDomain, addAlias, deleteAlias, listAlias } from './eas-improvmx'
import { redisClient } from './redis'
import config from '../config'
import promiseLimit from 'promise-limit'
export async function initializeDNS (sld: string): Promise<void> {
  const key = `${sld}.${config.TLD}.`
  const rootRecord = await redisClient.hGet(key, '@')
  const newTxtEntry = { ttl: 300, text: 'v=spf1 include:spf.improvmx.com ~all' }
  const newTxt = rootRecord.txt?.length > 0 ? [...rootRecord.txt, newTxtEntry] : [newTxtEntry]
  const newMx = config.improvMX.mx.map((mx, i) => ({ ttl: 300, preference: i * 10, host: mx }))
  // TODO: should do a watch here to ensure record is not modified. Will fix later
  // https://redis.io/docs/manual/transactions/
  const rootRecordWithMx = {
    ...rootRecord,
    mx: newMx,
    txt: newTxt
  }
  const rs = await redisClient.hSet(key, '@', rootRecordWithMx)
  console.log(`Initialized DNS for domain ${sld}; Redis response: ${rs}`)
}

export async function activate (sld: string, alias: string, forward: string): Promise<void> {
  const domain = await getDomain(sld)
  if (domain === null) {
    await initializeDNS(sld)
    await addDomain(sld)
    console.log(`Adding domain ${sld} to ImprovMX`)
  } else {
    console.log(`Domain ${sld} already exists in ImprovMX`)
  }
  const res = await addAlias(sld, alias, forward)
  console.log(`[${sld}] Added alias ${alias} -> ${forward}`)
  console.log(res)
}

export async function deactivate (sld: string, alias: string): Promise<void> {
  const res = await deleteAlias(sld, alias)
  console.log(`[${sld}] Removed alias ${alias}`)
  console.log(res)
}

const plimiter = promiseLimit(5)
export async function deactivateAll (sld: string): Promise<void> {
  const entries = await listAlias(sld)
  const aliases = entries.map(e => e.alias)
  await Promise.all(aliases.map(async (a) => plimiter(async () => { await deactivate(sld, a) })))
}
