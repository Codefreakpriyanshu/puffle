import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { NFTStorage, File } from 'nft.storage'

import mime from 'mime'
import path from 'path'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setfile] = useState()
  const [ipfsurl, setipfsurl] = useState("")
  const [loading, setloading] = useState(false)

  const NFT_STORAGE_KEY = 'ef7a5873.48621c92ee8e42a0b10081e262498f61'
  async function storeNFT(path, name, description) {

    const image = await fileFromPath(path)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
      image,
      name,
      description,
    })
  }
  async function fileFromPath(filePath) {
    let fs;
    if (typeof window === 'undefined') {
      fs = require('fs');
      const content = await fs.promises.readFile(filePath)
      const type = mime.getType(filePath)
      return new File([content], path.basename(filePath || ''))
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Weclome to Nft minter !!</h1>
      <input type="file" accept="image/*" onChange={(e) => {
        setfile(e.target.files?.[0]);

      }} />
      <div className={styles.button} onClick={async (e) => {
        setloading(true)
        const result = await storeNFT(file?.webkitRelativePath || '', 'NFT', 'NFT')
        setloading(false)
        setipfsurl(result.url)

      }}>
        {loading ? <div className={styles.ldsdualring}></div> : <div>NFT minted successfully</div>}
        console.log(ipfsurl)

        <button className={styles.button}>
          Mint NFT

        </button>
      </div>
    </>
  );
}