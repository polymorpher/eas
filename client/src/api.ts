import config from '../config'
import { ethers } from 'ethers'
import { type ExternalProvider } from '@ethersproject/providers'
import EASAbi from '../../contract/abi/EAS.json'
import IDCAbi from '../../contract/abi/IDC.json'
import { type EAS, type IDC } from '../../contract/typechain-types'

// const base = axios.create({ baseURL: config.easServer, timeout: 10000 })

export const apis = {
  activate: async function (sld: string, alias: string): Promise<boolean> {
    return true
  },

  deactivate: async function (sld: string, alias: string): Promise<boolean> {
    return true
  },

  deactivateAll: async function (sld: string, alias: string): Promise<boolean> {
    return true
  }
}

export interface Client {
  eas: EAS
  dc: IDC
  getOwner: (sld: string) => Promise<string>
  getExpirationTime: (sld: string) => Promise<number>
  getNumAlias: (sld: string) => Promise<number>
  getPublicAliases: (sld: string) => Promise<string[]>
  activate: (sld: string, alias: string, commitment: string, makePublic: boolean) => Promise<void>
  deactivate: (sld: string, alias: string) => Promise<void>
  deactivateAll: (sld: string) => Promise<void>

}
export const buildClient = async (provider?): Promise<Client> => {
  const etherProvider = provider ? new ethers.providers.Web3Provider(provider) : new ethers.providers.JsonRpcProvider(config.defaultRpc)
  const eas = new ethers.Contract(config.easContract, EASAbi, etherProvider) as EAS
  const dcAddress = await eas.dc()
  const dc = new ethers.Contract(dcAddress, IDCAbi, etherProvider) as IDC
  return {
    eas,
    dc,
    getOwner: async (sld: string) => {
      const r = await dc.nameRecords(ethers.utils.id(sld))
      return r.renter
    },
    getExpirationTime: async (sld: string) => {
      const r = await dc.nameRecords(ethers.utils.id(sld))
      return r.expirationTime.toNumber()
    },
    getPublicAliases: async (sld: string) => {
      return await eas.getPublicAliases(ethers.utils.id(sld))
    },
    getNumAlias: async (sld: string) => {
      const r = await eas.getNumAlias(ethers.utils.id(sld))
      return r.toNumber()
    },
    activate: async (sld: string, alias: string, commitment: string, makePublic: boolean) => {
      await eas.activate(ethers.utils.id(sld), ethers.utils.id(alias), commitment, makePublic ? alias : '')
    },
    deactivate: async (sld: string, alias: string) => {
      await eas.deactivate(ethers.utils.id(sld), ethers.utils.id(alias))
    },
    deactivateAll: async (sld: string) => {
      await eas.deactivateAll(ethers.utils.id(sld))
    }
  }
}
