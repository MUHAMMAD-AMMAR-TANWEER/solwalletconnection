'use client'
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js'
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
} from '@metaplex-foundation/js'
import * as fs from 'fs'
import { walletAdapterIdentity } from '@metaplex-foundation/js'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'

const tokenName = 'Ammar NFT'
const description = 'Description'
const symbol = 'SYMBOL'
const sellerFeeBasisPoints = 100
export default function MintNFT() {
  async function createNft(metaplex: Metaplex, uri: string, user: PublicKey) {
    const { nft } = await metaplex
      .nfts()
      .create(
        {
          uri: uri,
          name: tokenName,
          sellerFeeBasisPoints: sellerFeeBasisPoints,
          symbol: symbol,
          creators: [{ address: user, share: 100 }],
          isMutable: false,
          maxSupply: toBigNumber(1),
        },
        { commitment: 'finalized' },
      )
      .then()

    console.log(
      `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`,
    )

    return nft
  }
  const { connection } = useConnection()
  const wallet = useWallet()
  const { publicKey } = useWallet()
  async function mint() {
    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet))
      .use(
        bundlrStorage({
          address: 'https://devnet.bundlr.network',
          providerUrl: 'https://api.devnet.solana.com',
          timeout: 60000,
        }),
      )

    // const buffer = fs.readFileSync('../../assets/diamondnewImage.jpg', 'utf8')
    // const file = toMetaplexFile(buffer, 'diamondnewImage.jpg')

    // const imageUri = await metaplex.storage().upload(file)
    const imageUri = `https://cdn.discordapp.com/attachments/1075720432688320563/1084720334529364030/diamondnewImage.jpg`
    console.log(`Image uri: ${imageUri}`)

    const { uri } = await metaplex
      .nfts()
      .uploadMetadata({
        name: tokenName,
        description: description,
        image: imageUri,
        attributes: [
          { trait_type: 'Shape', value: 'Rounded' },
          { trait_type: 'Weight', value: '6.66' },
          { trait_type: 'Color', value: 'D' },
          { trait_type: 'Clarity', value: 'VS1' },
          { trait_type: 'Cut', value: 'EX' },
          { trait_type: 'Polish', value: 'EX' },
          { trait_type: 'Symmetry', value: 'EX' },
          { trait_type: 'Depth', value: '59.50' },
          { trait_type: 'Table', value: '60.00' },
          { trait_type: 'Fluor', value: 'N' },
          { trait_type: 'Measurements', value: '12.23x12.26x7.28' },
          { trait_type: 'Culet', value: 'NONE' },
          { trait_type: 'Girdle', value: 'Thin-Medium' },
          { trait_type: 'Girdle Percent', value: '3%' },
          { trait_type: 'Girdle Condition', value: 'Faceted' },
          { trait_type: 'Crown Angle', value: '34^' },
          { trait_type: 'Crown Height', value: '13^5' },
          { trait_type: 'Pavillion Angle', value: '40.8' },
          { trait_type: 'Pavillion Depth', value: '43' },
          { trait_type: 'Certificate', value: 'URL' },
          { trait_type: 'Certificate Date', value: 'Jan 19, 2022' },
          { trait_type: 'Location', value: 'New York' },
        ],
      })
      .then()
    console.log('metadata uri:', uri)
    if (publicKey !== null) {
      await createNft(metaplex, uri, publicKey)
    } else {
      console.log(`please connect wallet`)
    }
  }

  return (
    <div>
      <h1>Hell Yeah</h1>
      <button
        onClick={() => {
          mint()
        }}
      >
        {' '}
        Mint Nft
      </button>
    </div>
  )
}
