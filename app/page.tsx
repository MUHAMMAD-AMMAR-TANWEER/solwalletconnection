'use client'
import { NextPage } from 'next'
import styles from './(component)/Home.module.css'
import WalletContextProvider from './(component)/walletContextProvider'
import { AppBar } from './(component)/AppBar'
import Head from 'next/head'
import { PingButton } from './(component)/PingButton'
import { BalanceDisplay } from './(component)/Balance'
import SendTransaction from './(component)/sendAmount'
import MintNFT from './(component)/MintNFT'

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <BalanceDisplay />
        <SendTransaction />
        <MintNFT />
        {/* <div className={styles.AppBody}>
          <PingButton />
        </div> */}
      </WalletContextProvider>
    </div>
  )
}
