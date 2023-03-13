'use client'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { FC, useEffect, useState } from 'react'
import { Text } from '@nextui-org/react'

export const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useState(0)
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!connection || !publicKey) {
      return
    }

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info!.lamports)
    })
  }, [connection, publicKey])

  return (
    <div>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          textAlign: 'center',
        }}
        weight="bold"
      >
        {publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL}` : ''}
      </Text>
    </div>
  )
}
