import { HardhatRuntimeEnvironment } from 'hardhat/types'
import '@nomicfoundation/hardhat-ethers'
import { ethers } from 'hardhat'
import { EAS } from '../typechain-types'
import { BaseContract } from 'ethers'
const DC_CONTRACT = process.env.DC_CONTRACT as string
const MAX_NUM_ALIAS = process.env.MAX_NUM_ALIAS as string
const MAINTAINERS = JSON.parse(process.env.MAINTAINERS || '[]') as string[]
const UPGRADED_FROM = process.env.UPGRADED_FROM as string

const f = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments: { deploy }, getNamedAccounts } = hre
  const { deployer } = await getNamedAccounts()
  const easDeploy = await deploy('EAS', {
    from: deployer,
    args: [
      DC_CONTRACT,
      MAX_NUM_ALIAS
    ]
  })
  const eas = await ethers.getContractAt('EAS', easDeploy.address) as BaseContract as EAS
  // ethers.p
  const maintainerRole = await eas.MAINTAINER_ROLE()
  console.log('maintainerRole', maintainerRole)
  for (const m of MAINTAINERS) {
    const tx = await eas.grantRole(maintainerRole, m)
    await tx.wait()
    console.log(`Granted maintainer to ${m} (tx: ${tx.hash})`)
  }
  if (UPGRADED_FROM) {
    const tx = await eas.setUpgradedFrom(UPGRADED_FROM)
    console.log(`Set upgradedFrom to ${UPGRADED_FROM} (tx: ${tx.hash})`)
    await tx.wait()
  }
  console.log('EAS deployed at:', await eas.getAddress())
  console.log('- Deployer Admin Role:', await eas.hasRole(await eas.DEFAULT_ADMIN_ROLE(), deployer))
  console.log('- Deployer Maintainer Role:', await eas.hasRole(maintainerRole, deployer))
  console.log('- DC:', await eas.dc())
  console.log('- maxNumAlias:', (await eas.maxNumAlias()).toString())
}
f.tags = ['EAS']
export default f
