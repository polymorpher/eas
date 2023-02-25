import './app.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider()
})

const container = document.getElementById('root')

if (container != null) {
  const root = createRoot(container)
  root.render(
    <>
      <WagmiConfig client={client}>
        <Routes/>
      </WagmiConfig>
      <ToastContainer position='top-left'/>
    </>)
}
