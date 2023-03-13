'use client'
import { useState, FC } from 'react'
import { Input, Grid, Text, Button } from '@nextui-org/react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as Web3 from '@solana/web3.js'

export default function SendTransaction() {
  const [receiverAddress, setReceiverAddress] = useState<any>(null)
  const [amount, setAmount] = useState(0)
  const [tx, setTx] = useState('')
  const { connection } = useConnection()
  const { publicKey, sendTransaction, autoConnect } = useWallet()
  const link = () => {
    return tx ? `https://explorer.solana.com/tx/${tx}?cluster=devnet` : ''
  }

  const sendSol = async () => {
    if (!connection || !publicKey) {
      alert('Please connect the wallet lol')
      return
    }
    const transaction = new Web3.Transaction()
    const sendSolInstruction = Web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new Web3.PublicKey(receiverAddress),
      lamports: amount * Web3.LAMPORTS_PER_SOL,
    })
    let blockhash = await connection.getRecentBlockhash('finalized')

    transaction.add(sendSolInstruction)

    sendTransaction(transaction, connection).then((sig) => {
      setTx(sig)
    })
  }

  const handleAddressInputChange = (event: any) => {
    event.persist()
    setReceiverAddress(event.target.value)
  }

  const handleAmountInput = (event: any) => {
    event.persist()
    setAmount(event.target.value)
  }

  return (
    <div>
      {publicKey ? (
        <Grid.Container gap={4}>
          <Grid>
            <Input
              labelPlaceholder="Receiver"
              status="secondary"
              helperText="Required"
              onChange={handleAddressInputChange}
            />
          </Grid>
          <Grid>
            <Input
              labelPlaceholder="Amount"
              status="secondary"
              helperText="Required"
              onChange={handleAmountInput}
            />
          </Grid>

          <Grid>
            <Button color="secondary" auto onClick={sendSol}>
              Send
            </Button>
          </Grid>
        </Grid.Container>
      ) : (
        <Text>Connet Wallet Please</Text>
      )}
    </div>
  )
}
