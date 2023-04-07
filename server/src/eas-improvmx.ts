import axios, { type AxiosError, type AxiosResponse } from 'axios'
import config from '../config'
import { StatusCodes } from 'http-status-codes'

const base = axios.create({
  baseURL: config.improvMX.apiRoot,
  timeout: 10000,
  headers: { Authorization: `Basic api:${config.improvMX.key}` }
})

export async function addDomain (sld: string, notificationEmail?: string): Promise<any> {
  const { data } = await base.post('/domains', { domain: `${sld}.${config.TLD}`, notification_email: notificationEmail })
  return data
}

interface DomainInfo {
  success: boolean
  domain: any
}
export async function getDomain (sld: string): Promise<DomainInfo | null> {
  try {
    const { data } = await base.get(`/domains/${sld}.${config.TLD}`)
    return data
  } catch (ex) {
    if ((ex as AxiosError)?.response?.status === 404) {
      return null
    }
    throw ex
  }
}

export async function addAlias (sld: string, alias: string, forward: string): Promise<any> {
  const { data } = await base.post(`/domains/${sld}.${config.TLD}/aliases/`, { alias, forward })
  return data
}
export async function updateAlias (sld: string, alias: string, forward: string): Promise<any> {
  const { data } = await base.put(`/domains/${sld}.${config.TLD}/aliases/${alias}`, { forward })
  return data
}

export async function deleteAlias (sld: string, alias: string): Promise<any> {
  const { data } = await base.delete(`/domains/${sld}.${config.TLD}/aliases/${alias}`)
  return data
}

interface AliasEntry {
  alias: string
  forward: string
  id: number
}
export async function listAlias (sld: string): Promise<AliasEntry[]> {
  const { data } = await base.get(`/domains/${sld}.${config.TLD}/aliases/`)
  return data?.aliases
}

export async function getAlias (sld: string, alias: string): Promise<AliasEntry> {
  const { data } = await base.get(`/domains/${sld}.${config.TLD}/aliases/${alias}`)
  return data?.alias
}

export async function checkAlias (sld: string, alias: string): Promise<boolean> {
  try {
    await getAlias(sld, alias)
    return true
  } catch (ex: any) {
    const r = ex?.response as AxiosResponse
    if (r?.status === StatusCodes.NOT_FOUND) {
      return false
    }
    throw ex
  }
}
