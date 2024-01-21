import EASAbi from '../abi/EAS.json' assert { type: 'json' }
import IDCAbi from '../abi/IDC.json' assert { type: 'json' }
import config from '../config.js'
import { type BaseContract, ethers } from 'ethers'
import { type EAS, type IDC } from '../typechain-types/index.js'
const provider = new ethers.JsonRpcProvider(config.provider)
const eas = new ethers.Contract(config.easContract, EASAbi, provider) as BaseContract as EAS
interface VerifyParameters {
  signature: string
  sld: string
  alias: string
  forwardAddress: string
}

export async function getOwner (sld: string): Promise<string> {
  const dcAddress = await eas.dc()
  const dc = new ethers.Contract(dcAddress, IDCAbi, provider) as BaseContract as IDC
  const r = await dc.ownerOf(sld)
  return r.toLowerCase()
}

export async function isOwnerOrAllowedMaintainer (sld: string, address: string): Promise<boolean> {
  const isMaintainer = await eas.hasRole(await eas.MAINTAINER_ROLE(), address)
  const allowMaintainer = await eas.getAllowMaintainerAccess(ethers.id(sld))
  if (allowMaintainer && isMaintainer) {
    return true
  }
  const owner = await getOwner(sld)
  if (owner.toLowerCase() === address.toLowerCase()) {
    return true
  }
  return false
}

interface VerifyCommitmentResult {
  actualCommitment?: string
  expectedCommitment?: string
  success: boolean
}
export async function verifyCommitment ({ signature, sld, alias, forwardAddress }: VerifyParameters): Promise<VerifyCommitmentResult> {
  const actualCommitment = await eas.getCommitment(ethers.id(sld), ethers.id(alias))
  const separator = ethers.toUtf8Bytes(await eas.SEPARATOR())
  const data = ethers.concat([ethers.toUtf8Bytes(alias), separator, ethers.toUtf8Bytes(forwardAddress), separator, signature])
  const expectedCommitment = ethers.keccak256(data)
  return { success: expectedCommitment === actualCommitment, actualCommitment, expectedCommitment }
}

export async function verifyDeactivation (sld: string, alias: string): Promise<boolean> {
  const c = await eas.getCommitment(ethers.id(sld), ethers.id(alias))
  return BigInt(c) === 0n
}

export async function isAllDeactivated (sld: string): Promise<boolean> {
  const r = await eas.getNumAlias(ethers.id(sld))
  return r === 0n
}

export async function verifySignature ({ signature, sld, alias, forwardAddress }: VerifyParameters): Promise<boolean> {
  const digest = ethers.hashMessage(config.message(sld, alias, forwardAddress))
  const address = ethers.recoverAddress(digest, signature)
  try {
    return await isOwnerOrAllowedMaintainer(sld, address)
  } catch (ex) {
    console.error(ex)
    return false
  }
}
