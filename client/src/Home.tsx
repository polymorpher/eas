import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import config from '../config'
import { Button, Input, LinkWrarpper } from './components/Controls'
import { BaseText, Desc, DescLeft, SmallText, Title, FloatingText } from './components/Text'
import { Col, FlexRow, Main, Row } from './components/Layout'
import styled from 'styled-components'
import humanizeDuration from 'humanize-duration'
import { toast } from 'react-toastify'
import { activate, buildClient, deactivate, deactivateAll } from './api'
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

const getSld = (): string | null => {
  if (!window) {
    return null
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
  const [web3, setWeb3] = useState(new Web3(config.defaultRPC))
  const [address, setAddress] = useState('')
  const [client, setClient] = useState(buildClient())

  // for updating stuff
  const [url, setUrl] = useState('')
  const [sld, setSld] = useState('')

  const expired = record?.expirationTime - Date.now() < 0

  if (name === '' || name === 'names') {
    return (
            <Container>
                {lastRentedRecord &&
                  <Banner>
                    <Row style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                      <SmallTextGrey>last purchase</SmallTextGrey>
                      <a
                        href={`https://${parameters.lastRented}${config.tld}`} target='_blank' rel='noreferrer'
                        style={{ color: 'grey', textDecoration: 'none' }}
                      ><BaseText>{parameters.lastRented}{config.tld}</BaseText>
                      </a> <BaseText>({lastRentedRecord.lastPrice.formatted} ONE)</BaseText>
                    </Row>
                  </Banner>}
                <FlexRow style={{ alignItems: 'baseline', marginTop: 120 }}>
                    <Title style={{ margin: 0 }}>Get your web3+2 domain ({subdomain})</Title>
                </FlexRow>
                <DescLeft>
                    <BaseText>How it works:</BaseText>
                    <BaseText>- Here (<a href={`https://${config.tldHub}`}>{config.tldHub}</a>), you can rent a {config.tld} domain </BaseText>
                    <BaseText>- You can trade it as NFT, use it in ENS, wallets, and other web3 services</BaseText>
                    <BaseText>- It also works in browser! This domain is backward compatible with web2 </BaseText>
                    <BaseText>- Later, you can setup a simple website on the domain, configure DNS, and do many things no one in web3 has done before</BaseText>
                    <BaseText>- example: <a href={`https://${config.tldExample}`} target='_blank' rel='noreferrer'>{config.tldExample}</a></BaseText>
                    <BaseText style={{ marginTop: 16 }}>Bugs or suggestions?</BaseText>
                    <BaseText>- Please create an issue on <a href='https://github.com/harmony-one/dot-country' target='_blank' rel='noreferrer'>GitHub</a></BaseText>
                </DescLeft>
                {!address && <Button onClick={connect} style={{ width: 'auto' }}>CONNECT METAMASK</Button>}
                {address &&
                  <Col style={{ alignItems: 'center' }}>
                    <Title>Rent a domain now</Title>
                    <Row style={{ width: '100%', gap: 0, justifyContent: 'center' }}>
                      <Input $width='128px' $margin='8px' value={sld} onChange={({ target: { value } }) => setSld(value)} />
                      <SmallTextGrey>.country</SmallTextGrey>
                    </Row>
                    <SmallTextGrey style={{ marginTop: 32, textAlign: 'center' }}>Which tweet do you showcase in your domain?</SmallTextGrey>
                    <Row style={{ width: '100%', gap: 0, position: 'relative' }}>
                      <Input $width='100%' $margin='8px' value={url} onChange={({ target: { value } }) => setUrl(value)} />
                      <FloatingText>copy the tweet's URL</FloatingText>
                    </Row>
                      {checkingAvailability && (
                          <Row style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                              <TailSpin stroke='grey' width={16} />
                              <BaseText> Checking domain price and availability...</BaseText>
                          </Row>)}
                      {!checkingAvailability && isDomainAvailable === true && <BaseText>✅ Domain is available</BaseText>}
                      {!checkingAvailability && isDomainAvailable === false && <BaseText>❌ Domain unavailable</BaseText>}
                      {!regTxHash && !web2Acquired && <Button onClick={onRent} disabled={pending || !isDomainAvailable || checkingAvailability}>RENT</Button>}
                      {regTxHash && !web2Acquired && <Button onClick={claimWeb2DomainWrapper} disabled={pending}>TRY AGAIN</Button>}
                      {web2Acquired && <BaseText>Your domain is ready! Checkout <a target='_blank' href={`http://${sld}${config.tld}`} rel='noreferrer'>{sld}{config.tld}</a></BaseText>}
                      {price !== null && !web2Acquired && (
                          <Col>
                              <Row style={{ marginTop: 32, justifyContent: 'center' }}>
                                  <Label>price</Label><BaseText>{price?.formatted} ONE</BaseText>
                              </Row>
                              <Row style={{ justifyContent: 'center' }}>
                                  <SmallTextGrey>for {humanD(parameters.duration)} </SmallTextGrey>
                              </Row>
                          </Col>)}
                  </Col>}
            </Container>
    )
  }

  return (
        <Container>
            {lastRentedRecord &&
              <Banner>
                <Row style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                  <SmallTextGrey>last purchase</SmallTextGrey>
                  <a
                    href={`https://${parameters.lastRented}${config.tld}`} target='_blank' rel='noreferrer'
                    style={{ color: 'grey', textDecoration: 'none' }}
                  >
                    <BaseText>{parameters.lastRented}{config.tld}</BaseText>
                  </a> <BaseText>({lastRentedRecord.lastPrice.formatted} ONE)</BaseText>
                </Row>
              </Banner>}
            <FlexRow style={{ alignItems: 'baseline', marginTop: 120 }}>
                <Title style={{ margin: 0 }}>{name}</Title>
                <a href={`https://${config.tldHub}`} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                    <BaseText style={{ fontSize: 12, color: 'grey', marginLeft: '16px', textDecoration: 'none' }}>
                        {subdomain}
                    </BaseText>
                </a>
            </FlexRow>
            {record?.renter &&
              <DescResponsive style={{ marginTop: 16 }}>
                <Row style={{ justifyContent: 'space-between' }}>

                    {record.prev
                      ? (
                            <a href={`https://${record.prev}${config.tld}`} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                                <FlexRow style={{ gap: 16 }}>
                                    <SmallTextGrey>{'<'} prev</SmallTextGrey><SmallTextGrey>{record.prev}{config.tld}</SmallTextGrey>
                                </FlexRow>
                            </a>)
                      : (<BaseText> </BaseText>)}

                    {record.next &&
                      <a href={`https://${record.next}${config.tld}`} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                        <FlexRow style={{ gap: 16 }}>
                          <SmallTextGrey>{record.next}{config.tld}</SmallTextGrey> <SmallTextGrey> next {'>'}</SmallTextGrey>
                        </FlexRow>
                      </a>}
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Label>owned by</Label><BaseText style={{ wordBreak: 'break-word' }}>{record.renter}</BaseText>
                </Row>
                <Row>
                  <Label>purchased on</Label>
                  <BaseText> {new Date(record.rentTime).toLocaleString()}</BaseText>
                </Row>
                <Row>
                  <Label>expires on</Label>
                  <BaseText> {new Date(record.expirationTime).toLocaleString()}</BaseText>
                    {!expired && <SmallTextGrey>(in {humanD(record.expirationTime - Date.now())})</SmallTextGrey>}
                    {expired && <SmallText style={{ color: 'red' }}>(expired)</SmallText>}
                </Row>
                  {tweetId &&
                    <TweetContainerRow>
                      <TwitterTweetEmbed tweetId={tweetId} />
                    </TweetContainerRow>}
                <Row style={{ marginTop: 32, justifyContent: 'center' }}>
                    {record.url && !tweetId &&
                      <Col>
                        <BaseText>Owner embedded an unsupported link:</BaseText>
                        <SmallTextGrey> {record.url}</SmallTextGrey>
                      </Col>}
                    {!record.url &&
                      <BaseText>Owner hasn't embedded any tweet yet</BaseText>}
                </Row>
                  {!isOwner
                    ? (
                          <>
                              <Title style={{ marginTop: 32, textAlign: 'center' }}>
                                  This domain is already taken
                              </Title>
                              <BaseText>Get your own at <a href={`https://${config.tldHub}`} target='_blank' rel='noreferrer'>{config.tldHub}</a></BaseText>
                          </>)
                    : (
                          <Title style={{ marginTop: 32, textAlign: 'center' }}>
                              You own this page
                          </Title>)}

              </DescResponsive>}

            {!address && isOwner && <Button onClick={connect} style={{ width: 'auto' }}>CONNECT METAMASK</Button>}

            {address && isOwner && (
                <>
                    <SmallTextGrey style={{ marginTop: 32 }}>Which tweet do you want this page to embed?</SmallTextGrey>
                    <Row style={{ width: '80%', gap: 0, position: 'relative' }}>
                        <Input $width='100%' $margin='8px' value={url} onChange={({ target: { value } }) => setUrl(value)} />
                        <FloatingText>copy the tweet's URL</FloatingText>
                    </Row>
                    <Button onClick={onUpdateUrl} disabled={pending}>UPDATE URL</Button>
                    <Title style={{ marginTop: 64 }}>Renew ownership</Title>
                    <Row style={{ justifyContent: 'center' }}>
                        <Label>renewal price</Label><BaseText>{price?.formatted} ONE</BaseText>
                    </Row>
                    <SmallTextGrey>for {humanD(parameters.duration)} </SmallTextGrey>
                    <Button onClick={() => ({})} disabled>RENEW</Button>
                    <SmallTextGrey>*Renewal is disabled at this time. It will be re-enabled in the coming months.</SmallTextGrey>
                    <SmallTextGrey>Your address: {address}</SmallTextGrey>
                </>
            )}
            <SmallTextGrey>Learn more about the future of domain name services: <a href='https://harmony.one/domains' target='_blank' rel='noreferrer'>RADICAL Market for Internet Domains</a></SmallTextGrey>
            <div style={{ height: 200 }} />
        </Container>
  )
}

export default Home
