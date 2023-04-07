import config from '../config'
import { type ContractTransaction, ethers } from 'ethers'
import EASAbi from '../../contract/abi/EAS.json'
import IDCAbi from '../../contract/abi/IDC.json'
import { type EAS, type IDC } from '../../contract/typechain-types'
import axios from 'axios'

const base = axios.create({ baseURL: config.easServer, timeout: 10000 })

interface APIResponse {
  success?: boolean
  error?: string
}
export const apis = {
  activate: async function (sld: string, alias: string, forwardAddress: string, signature: string): Promise<APIResponse> {
    const { data } = await base.post('/activate', { sld, alias, forwardAddress, signature })
    return data
  },

  deactivate: async function (sld: string, alias: string): Promise<APIResponse> {
    const { data } = await base.post('/deactivate', { sld, alias })
    return data
  },

  deactivateAll: async function (sld: string): Promise<APIResponse> {
    const { data } = await base.post('/deactivate-all', { sld })
    return data
  },

  check: async function (sld: string, alias: string): Promise<boolean> {
    const { data } = await base.post('/check-alias', { sld, alias })
    return data.exist
  }
}

export interface Client {
  eas: EAS
  dc: () => Promise<IDC>
  getOwner: (sld: string) => Promise<string>
  getExpirationTime: (sld: string) => Promise<number>
  getNumAlias: (sld: string) => Promise<number>
  getPublicAliases: (sld: string) => Promise<string[]>
  activate: (sld: string, alias: string, commitment: string, makePublic: boolean) => Promise<ContractTransaction>
  deactivate: (sld: string, alias: string) => Promise<ContractTransaction>
  deactivateAll: (sld: string) => Promise<ContractTransaction>
  buildSignature: (sld: string, alias: string, forward: string) => Promise<string>
  isAliasInUse: (sld: string, alias: string) => Promise<boolean>

}
export const buildClient = (provider?, signer?): Client => {
  const etherProvider = provider ?? new ethers.providers.StaticJsonRpcProvider(config.defaultRpc)
  // const etherProvider = new ethers.providers.JsonRpcProvider(config.defaultRpc)
  let eas = new ethers.Contract(config.easContract, EASAbi, etherProvider) as EAS
  let _dc: IDC
  const dc = async (): Promise<IDC> => {
    if (_dc) {
      return _dc
    }
    const dcAddress = await eas.dc()
    _dc = new ethers.Contract(dcAddress, IDCAbi, etherProvider) as IDC
    if (signer) {
      _dc = _dc.connect(signer)
    }
    return _dc
  }
  dc().catch(e => { console.error(e) })

  if (signer) {
    eas = eas.connect(signer)
  }

  return {
    eas,
    dc,
    getOwner: async (sld: string) => {
      const c = await dc()
      return c.ownerOf(sld)
    },
    getExpirationTime: async (sld: string) => {
      const c = await dc()
      const r = await c.nameExpires(sld)
      return r.toNumber() * 1000
    },
    getPublicAliases: async (sld: string) => {
      return await eas.getPublicAliases(ethers.utils.id(sld))
    },
    getNumAlias: async (sld: string) => {
      const r = await eas.getNumAlias(ethers.utils.id(sld))
      return r.toNumber()
    },
    isAliasInUse: async (sld: string, alias: string) => {
      const c = await eas.getCommitment(ethers.utils.id(sld), ethers.utils.id(alias))
      return !ethers.BigNumber.from(c).eq(0)
    },
    activate: async (sld: string, alias: string, commitment: string, makePublic: boolean) => {
      return await eas.activate(sld, ethers.utils.id(alias), commitment, makePublic ? alias : '')
    },
    deactivate: async (sld: string, alias: string) => {
      return await eas.deactivate(sld, ethers.utils.id(alias))
    },
    deactivateAll: async (sld: string) => {
      return await eas.deactivateAll(sld)
    },
    buildSignature: async (sld: string, alias: string, forward: string) => {
      const msg = config.message(sld, alias, forward)
      return await eas.signer.signMessage(msg)
    }
  }
}
