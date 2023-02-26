import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useProvider, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ethers } from 'ethers'
import config from '../config'
import { Button, Input, LinkWrarpper } from './components/Controls'
import { BaseText, Desc, DescLeft, SmallText, Title, FloatingText } from './components/Text'
import { Col, FlexColumn, FlexRow, Main, Row } from './components/Layout'
import styled from 'styled-components'
import humanizeDuration from 'humanize-duration'
import { toast } from 'react-toastify'
import { buildClient, type Client, apis } from './api'
import BN from 'bn.js'
import { TailSpin } from 'react-loading-icons'
import { Feedback } from './components/Misc'

const humanD = humanizeDuration.humanizer({ round: true, largest: 1 })

const Container = styled(Main)`
  margin: 0 auto;
  padding: 0 16px;
  max-width: 800px;
  // TODO: responsive
`

const SmallTextGrey = styled(SmallText)`
  color: grey;
`

const Label = styled(SmallTextGrey)`
  margin-right: 16px;
`

const DescResponsive = styled(Desc)`
  @media(max-width: 640px){
    text-align: left;
    align-items: start;
  }
`

// RFC 2822
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

const getSld = (): string => {
  if (!window) {
    return ''
  }
  const host = window.location.host
  const parts = host.split('.')
  if (parts.length <= 1) {
    return ''
  }
  if (parts.length <= 2) {
    return parts[0]
  }
  return parts.slice(0, parts.length - 1).join('.')
}

const InputBox = styled(Input)`
  border-bottom: none;
  font-size: 12px;
  margin: 0;
  background: #e0e0e0;
  &:hover{
    border-bottom: none;
  }
`

const Home: React.FC = ({ subdomain: string = config.tld }) => {
  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const [expirationTime, setExpirationTime] = useState(0)
  const [publicAliases, setPublicAliases] = useState([])
  const [numAlias, setNumAlias] = useState(0)
  const [owner, setOwner] = useState('')
  const [aliases, setAliases] = useState([])
  const [newAlias, setNewAlias] = useState('')
  const [forwards, setForwards] = useState([])
  const [newForward, setNewForward] = useState('')
  const [newMakePublic, setNewMakePublic] = useState(true)
  const [client, setClient] = useState(buildClient())
  const { data: signer } = useSigner()

  const { connect } = useConnect({ connector: new InjectedConnector() })
  const { disconnect } = useDisconnect()

  const sld = getSld()
  console.log('sld', sld)

  useEffect(() => {
    if (!provider || !signer) {
      return
    }
    const c = buildClient(provider, signer)
    setClient(c)
  }, [provider, signer])

  useEffect(() => {
    if (!isConnected || !address || !client || !sld) {
      return
    }
    client.getOwner(sld).then(e => setOwner(e))
    client.getExpirationTime(sld).then(e => setExpirationTime(e))
    client.getPublicAliases(sld).then(e => setPublicAliases(e))
    client.getNumAlias(sld).then(e => setNumAlias(e))
  }, [isConnected, address, client, sld])

  const add = async (alias: string, forward: string, makePublic: boolean): Promise<void> => {
    if (!EMAIL_REGEX.test(forward)) {
      toast.error(`Invalid forward email: ${forward}`)
      return
    }
    try {
      const signature = await client.buildSignature(sld, alias, forward)
      const separator = ethers.utils.toUtf8Bytes(await client.eas.SEPARATOR())
      const data = ethers.utils.concat([ethers.utils.toUtf8Bytes(alias), separator, ethers.utils.toUtf8Bytes(forward), separator, signature])
      const commitment = ethers.utils.keccak256(data)
      const tx = await client.activate(sld, newAlias, commitment, makePublic)
      toast.info('Operation completed on blockchain. Completing activation on mail server...')
      toast.info(
        <FlexColumn>
          <BaseText style={{ marginRight: 8 }}>Operation completed on blockchain. Completing activation on mail server...</BaseText>
          <LinkWrarpper target='_blank' href={client.getExplorerUri(tx.hash)}>
            <BaseText>View transaction</BaseText>
          </LinkWrarpper>
        </FlexColumn>)
      console.log(tx)
      const { success, error } = await apis.activate(sld, alias, forward, signature)
      if (success) {
        toast.success('Activation complete!')
      } else {
        toast.error(`Activation failed. ${error ? `Error: ${error}` : 'Please contact us'}`)
      }
    } catch (ex) {
      console.error(ex)
      // @ts-expect-error catch error in response
      if (ex?.response?.error) {
        // @ts-expect-error catch error in response
        toast.error(`Request failed. Error: ${ex?.response?.error}`)
      }
      toast.info('Request cancelled')
    }
  }

  const expired = expirationTime > 0 && (expirationTime - Date.now() < 0)

  const isOwner = address && address.toLowerCase() === owner.toLowerCase()

  if (expired) {
    return <Container>
      <FlexRow style={{ alignItems: 'baseline', marginTop: 120 }}>
        <Title>This domain has expired</Title>
      </FlexRow>
    </Container>
  }
  return (
    <Container>
      <FlexColumn style={{ alignItems: 'center', marginTop: 120, gap: 16 }}>
        <Title style={{ margin: 0 }}>{sld}.{config.tld}</Title>
        <SmallTextGrey>Email Alias Service (EAS)</SmallTextGrey>
      </FlexColumn>
      <Desc>
        {publicAliases.length > 0 && (<>
          <BaseText>You can reach the domain owner at:</BaseText>
          {publicAliases.map(a => {
            return <BaseText key={a}>{a}@{sld}{config.tld}</BaseText>
          })}
        </>)}
        {numAlias > 0 && publicAliases.length === 0 && (
        <BaseText>
          The domain owner chose not to disclose any email address. Please ask the owner for more information.
        </BaseText>
        )}
        {numAlias === 0 && (
        <BaseText>
          The domain owner has not activated any email
        </BaseText>
        )}

      </Desc>
      {!isConnected && <SmallText>Own this domain? Connect your wallet to setup emails.</SmallText>}
      {!isConnected && <Button onClick={connect} style={{ width: 'auto' }}>CONNECT WALLET</Button>}
      {isOwner && <Desc>
        <FlexRow style={{ gap: 16, background: '#eee', padding: 8, alignItems: 'baseline' }}>
          <BaseText> + </BaseText>
          <InputBox value={newAlias} onChange={({ target: { value } }) => setNewAlias(value)}/>
          <SmallTextGrey>@{sld}.{config.tld}</SmallTextGrey>
          <BaseText style={{ whiteSpace: 'nowrap' }}>FORWARD TO</BaseText>
          <InputBox type={'email'} value={newForward} onChange={({ target: { value } }) => setNewForward(value)}/>
          <Button $width={'auto'} onClick={async () => { await add(newAlias, newForward, newMakePublic) }}>ADD</Button>
        </FlexRow>
      </Desc>}
      <div style={{ height: 320 }}/>
      <Feedback/>
    </Container>)
}

export default Home
