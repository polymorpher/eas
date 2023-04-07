import React, { useEffect, useState } from 'react'
import { useAccount, useConnect, useProvider, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ethers } from 'ethers'
import config from '../config'
import { Button, Input, LinkWrarpper } from './components/Controls'
import { BaseText, Desc, FloatingText, SmallText, Title } from './components/Text'
import { FlexColumn, FlexRow, Main } from './components/Layout'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { buildClient, apis } from './api'
import { TailSpin } from 'react-loading-icons'
import { Feedback } from './components/Misc'
import useDebounce from './hooks/useDebounce'

const Container = styled(Main)`
  margin: 0 auto;
  padding: 0 16px;
  max-width: 800px;
  // TODO: responsive
`

const Loading: React.FC = () => {
  return <TailSpin stroke='grey' width={16} height={16} />
}
const SmallTextGrey = styled(SmallText)`
  color: grey;
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
  return parts[parts.length - 2]
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

const AliasInputBox = styled(InputBox)`
  padding-left: 8px;
  padding-right: 8px;
  text-align: right;
`

interface SuccessWithExplorerLinkParameters {
  message: string
  txHash: string
}

enum AliasValidity {
  ALIAS_VALIDITY_UNKNOWN = 0,
  ALIAS_VALIDITY_VALID,
  ALIAS_VALIDITY_INVALID,
  ALIAS_VALIDITY_INDETERMINISTIC
}

const SuccessWithExplorerLink: React.FC = ({ message, txHash }: SuccessWithExplorerLinkParameters) => {
  return <FlexColumn style={{ gap: 8 }}>
    <BaseText>{message}</BaseText>
    <LinkWrarpper target='_blank' href={config.explorer(txHash)}>
      <BaseText>View transaction</BaseText>
    </LinkWrarpper>
  </FlexColumn>
}

// TODO: 1. show private aliases after verifying signature;
//  2. display masked forward emails after verifying signature;
//  3. button to deactivate all aliases
//  4. regex and examples
//  5. explanation about privacy stuff
const Home: React.FC = () => {
  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const [expirationTime, setExpirationTime] = useState(0)
  const [publicAliases, setPublicAliases] = useState([])
  const [forwards, setForwards] = useState([])
  const [isPublicAliasesInUse, setIsPublicAliasesInUse] = useState<boolean[]>([])
  const [isPublicAliasesValid, setIsPublicAliasesValid] = useState<AliasValidity[]>([])
  const [numAlias, setNumAlias] = useState(0)
  const [owner, setOwner] = useState('')
  const [newAlias, setNewAlias] = useState('hello')
  const debouncedNewAlias = useDebounce(newAlias, 500)
  const [isNewAliasInUse, setIsNewAliasInUse] = useState(false)
  const [newForward, setNewForward] = useState('')
  const [newMakePublic] = useState(true)
  const [client, setClient] = useState(buildClient())
  const { data: signer } = useSigner()
  const { connect } = useConnect({ connector: new InjectedConnector() })
  const [pending, setPending] = useState(true)
  const [initializing, setInitializing] = useState(true)

  const sld = getSld()
  const numHiddenAliases = numAlias - isPublicAliasesInUse.filter(e => e).length -
      isPublicAliasesValid.filter(e => e === AliasValidity.ALIAS_VALIDITY_INVALID || e === AliasValidity.ALIAS_VALIDITY_UNKNOWN)

  const tryCatch = async (f: () => Promise<any>, isInit?: boolean): Promise<void> => {
    try {
      if (isInit) {
        setInitializing(true)
      } else {
        setPending(true)
      }
      await f()
    } catch (ex) {
      console.error(ex)
      // @ts-expect-error catch error in response
      if (ex?.response?.error) {
        // @ts-expect-error catch error in response
        toast.error(`Request failed. Error: ${ex?.response?.error}`)
      }
      toast.info('Request cancelled')
    } finally {
      if (isInit) {
        setInitializing(false)
      } else {
        setPending(false)
      }
    }
  }

  useEffect(() => {
    if (!client?.eas?.signer) {
      return
    }
    tryCatch(async () => {
      await Promise.all(publicAliases.map(e => client.isAliasInUse(sld, e))).then(rs => setIsPublicAliasesInUse(rs))
      // TODO: Doesn't work for regex alias. Need to implement a more power API at server to get all aliases and do regex matching on demand
      await Promise.all(publicAliases.map(async e => await apis.check(sld, e))).then(rs2 => {
        setIsPublicAliasesValid(rs2.map(e => e ? AliasValidity.ALIAS_VALIDITY_VALID : AliasValidity.ALIAS_VALIDITY_INVALID))
      })
    }, true).catch(ex => { console.error(ex) })
  }, [sld, publicAliases, client])

  useEffect(() => {
    if (!provider || !signer) {
      return
    }
    const c = buildClient(provider, signer)
    setClient(c)
  }, [provider, signer])

  useEffect(() => {
    if (!client || !sld) {
      return
    }
    tryCatch(async () => {
      return await Promise.all([
        client.getOwner(sld).then(e => setOwner(e)),
        client.getExpirationTime(sld).then(e => setExpirationTime(e)),
        client.getPublicAliases(sld).then(e => setPublicAliases(e)),
        client.getNumAlias(sld).then(e => setNumAlias(e))
      ])
    }, true).catch(e => { console.error(e) })
  }, [client, sld])

  useEffect(() => {
    if (!debouncedNewAlias || !client || !sld) {
      return
    }
    tryCatch(() => client.isAliasInUse(sld, debouncedNewAlias).then(b => {
      setIsNewAliasInUse(b)
    })).catch(e => { console.error(e) })
  }, [debouncedNewAlias, client, sld])

  const upsert = async (alias: string, forward: string, makePublic: boolean): Promise<void> => {
    if (!EMAIL_REGEX.test(forward)) {
      toast.error(`Invalid forward email: ${forward}`)
      return
    }
    await tryCatch(async () => {
      const signature = await client.buildSignature(sld, alias, forward)
      const separator = ethers.utils.toUtf8Bytes(await client.eas.SEPARATOR())
      const data = ethers.utils.concat([ethers.utils.toUtf8Bytes(alias), separator, ethers.utils.toUtf8Bytes(forward), separator, signature])
      const commitment = ethers.utils.keccak256(data)
      const tx = await client.activate(sld, newAlias, commitment, makePublic)
      toast.info(SuccessWithExplorerLink({
        txHash: tx.hash,
        message: 'Activated on-chain. Completing action on mail server...'
      }))
      console.log(tx)
      const { success, error } = await apis.activate(sld, alias, forward, signature)
      if (success) {
        toast.success('Activation complete!')
      } else {
        toast.error(`Activation failed. ${error ? `Error: ${error}` : 'Please contact us'}`)
      }
    })
  }

  const del = async (alias: string): Promise<void> => {
    await tryCatch(async () => {
      const tx = await client.deactivate(sld, alias)
      toast.info(SuccessWithExplorerLink({
        txHash: tx.hash,
        message: 'Deactivated on-chain. Completing action on mail server...'
      }))
      console.log(tx)
      const { success, error } = await apis.deactivate(sld, alias)
      if (success) {
        toast.success('Deactivation complete!')
      } else {
        toast.error(`Deactivation failed. ${error ? `Error: ${error}` : 'Please contact us'}`)
      }
    })
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
            return <BaseText style={{ background: '#eee', padding: 8 }} key={a}>{a}@{sld}.{config.tld}</BaseText>
          })}
        </>)}
        {numAlias > 0 && publicAliases.length === 0 && (
        <BaseText>
          The domain owner chose not to disclose any email address. Please ask the owner for more information.
        </BaseText>
        )}
        <SmallTextGrey>owner: {owner}</SmallTextGrey>
        {numAlias === 0 && (
        <BaseText>
          The domain owner has not activated any email
        </BaseText>
        )}

      </Desc>
      {!isConnected && <SmallText>Own this domain? Connect your wallet to setup emails.</SmallText>}
      {!isConnected && <Button onClick={connect} style={{ width: 'auto' }}>CONNECT WALLET</Button>}
      {isOwner && <Desc>
        <FlexRow style={{ gap: 16, background: '#eee', padding: 8, alignItems: 'center' }}>
          <BaseText> + </BaseText>
          <AliasInputBox value={newAlias} onChange={({ target: { value } }) => setNewAlias(value)}/>
          <SmallTextGrey>@{sld}.{config.tld}</SmallTextGrey>
          <BaseText style={{ whiteSpace: 'nowrap' }}>FORWARD TO</BaseText>
          <InputBox type={'email'} value={newForward} onChange={({ target: { value } }) => setNewForward(value)}/>
          <Button disabled={pending} $width={'auto'} onClick={async () => { await upsert(newAlias, newForward, newMakePublic) }}>
            {pending ? <Loading/> : (isNewAliasInUse ? 'UPDATE' : 'ADD')}
          </Button>
        </FlexRow>

        {!pending && numHiddenAliases > 0 && (
        <BaseText>Plus {numHiddenAliases} more private aliases</BaseText>
        )}

        {initializing && <><Loading/> Loading Email Configurations...</>}

        <BaseText style={{ margin: 16 }}>Your Existing Aliases</BaseText>

        {publicAliases.map((alias: string, i: number) => {
          if (!isPublicAliasesInUse[i]) {
            return <React.Fragment key={`${alias}`}></React.Fragment>
          }
          return (
            <FlexRow key={alias} style={{
              gap: 16,
              background: '#eee',
              minHeight: 51,
              padding: 8,
              alignItems: 'center',
              position: 'relative'
            }}>
              <BaseText> - </BaseText>
              <AliasInputBox style={{ cursor: 'disabled', backgroundColor: '#ccc' }} value={alias} disabled />
              <SmallTextGrey>@{sld}.{config.tld}</SmallTextGrey>
              <BaseText style={{ whiteSpace: 'nowrap' }}>FORWARD TO</BaseText>
              <InputBox placeholder={'****'} type={'email'}
                        value={forwards[i]}
                        onChange={({ target: { value } }) => setForwards(e => [...e.slice(0, i), value, e.slice(i + 1)])}
              />
              {isPublicAliasesValid[i] === AliasValidity.ALIAS_VALIDITY_VALID && <>
                <Button disabled={pending} $width={'auto'} onClick={async () => { await upsert(alias, newForward, true) }}>
                  {pending ? <Loading/> : 'UPDATE' }
                </Button>
                <Button disabled={pending} $width={'auto'} onClick={async () => { await del(alias) }}>
                  {pending ? <Loading/> : 'DELETE' }
                </Button>
              </>}
              {isPublicAliasesValid[i] === AliasValidity.ALIAS_VALIDITY_UNKNOWN || isPublicAliasesValid[i] === undefined && <>
                <Loading/>
              </>}
              {isPublicAliasesValid[i] === AliasValidity.ALIAS_VALIDITY_INVALID && <>
                <Button disabled={pending} $width={'auto'} onClick={async () => { await upsert(alias, forwards[i], true) }}>
                  {pending ? <Loading/> : 'ACTIVATE' }
                </Button>
                <FloatingText>This activation of this domain is not completed</FloatingText>
              </>}
            </FlexRow>
          )
        })}

      </Desc>}
      <div style={{ height: 320 }}/>
      <Feedback/>
    </Container>)
}

export default Home
