import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ethers } from 'ethers'
import config from '../config'
import { Button, Input, LinkWrarpper } from './components/Controls'
import { BaseText, Desc, DescLeft, SmallText, Title, FloatingText } from './components/Text'
import { Col, FlexRow, Main, Row } from './components/Layout'
import styled from 'styled-components'
import humanizeDuration from 'humanize-duration'
import { toast } from 'react-toastify'
import { buildClient, type Client, apis } from './api'
import BN from 'bn.js'
import { TailSpin } from 'react-loading-icons'

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

const Home: React.FC = ({ subdomain: string = config.tld }) => {
  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const [expirationTime, setExpirationTime] = useState(0)
  const [publicAliases, setPublicAliases] = useState([])
  const [numAlias, setNumAlias] = useState(0)
  const [owner, setOwner] = useState('')
  const [client, setClient] = useState<Client | undefined>()

  const { connect } = useConnect({ connector: new InjectedConnector() })
  const { disconnect } = useDisconnect()

  const sld = getSld()
  console.log('sld', sld)

  useEffect(() => {
    buildClient().then(c => setClient(c))
      .catch(ex => { console.error(ex) })
  }, [])

  useEffect(() => {
    console.log('provider is now', provider)
    if (!provider) {
      return
    }
    buildClient(provider).then(c => setClient(c))
      .catch(ex => { console.error(ex) })
  }, [provider])

  useEffect(() => {
    if (!isConnected || !address || !client || !sld) {
      return
    }
    client.getOwner(sld).then(e => setOwner(e))
    client.getExpirationTime(sld).then(e => setExpirationTime(e))
    client.getPublicAliases(sld).then(e => setPublicAliases(e))
    client.getNumAlias(sld).then(e => setNumAlias(e))
  }, [isConnected, address, client, sld])

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
      <FlexRow style={{ alignItems: 'baseline', marginTop: 120 }}>
        <Title style={{ margin: 0 }}>Email Alias Service</Title>
      </FlexRow>
      <DescLeft>
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
        <BaseText style={{ marginTop: 16 }}>Bugs or suggestions?</BaseText>
        <BaseText>- Please create an issue on <a href='https://github.com/harmony-one/eas' target='_blank' rel='noreferrer'>GitHub</a></BaseText>
      </DescLeft>
      <BaseText>Own this domain? Connect your wallet to setup emails.</BaseText>
      <Button onClick={connect} style={{ width: 'auto' }}>CONNECT WALLET</Button>
      {isOwner && <BaseText>You are owner!</BaseText>}
    </Container>)
}

export default Home
