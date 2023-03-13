import Head from 'next/head';
import { useState } from "react"; 
import styles from '@/styles/Home.module.css'
import { StoreMetadata } from './StoreMetadata';
import { ethers } from 'ethers';
import nft from "../components/nft.json";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ipfs, setIpfs] = useState('');
  const [address, setAddress] = useState('Connect Wallet');
  const [prompt2, setPrompt2] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');


async function fetchimage() {
  try {
    console.log(process.env.MY_APP_API_KEY);
    const response = await openai.createImage({
      prompt: prompt2,
      n: 1,
      size: "512x512",
    });
    const image = response.data.data[0].url;
    setImageUrl(image);
  } catch (error) {
    console.error(error);
  } _setTokenURI(newItemId, tokenURI_);
} 


async function connectWallet() {
  if (!window.ether) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address.slive(0, 6));

    console.log(await provider.getBlockNumber());
  } else {
    console.log("install metamask");
  }
}


const upload = async () => {
  try {
    const metadata = await StoreMetadata(image, name, description);
    const uri = metadata.url;
    setIpfs(uri);
    const provider = new ethers.providers.web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nft.address, nft.abi, signer);
    let trx = await contract.createToken(uri);
    await trx.wait();
    let trxHash = await provider.getTransactionReceipt(trx.hash);
    console.log(trxHash);
    if (trxHash.status === 1) {
      alert("Transaction successful! :)");
      console.log("txn success");
      setText('');

    } else {
      alert("Transaction failed. :(");
      console.log("txn failed")
    } 

  } catch (error) {
    console.log(error);
  } return go(f, send, [])
}

return (
  <div className={styles.container}>
    <button className={styles.connectbutton} onClick={connectWallet}>
      {address}
    </button>

    <Head>
      <title>Go Mint yourself Citizen.</title>
      <meta name="description" content="Create and Upload your own NFTs" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Generate <a>NFT</a>
      </h1>
      <p className={styles.description}></p>

      <div className={styles.form}>
        <div className={styles.firstrow}>
          <input
            className={styles.input}
            type="text"
            value={prompt2}
            placeholder="Enter a prompt"
            onChange={(event) => setPrompt2(event.target.value)}
          />

        </div>
        <button onClick={fetchimage} className={styles.button}>
          Generate
        </button>
        <br />
        <br />
        <img
          src={imageUrl}
          width="400"
          height="400"
          alt="nft"
          className={styles.nftimg}
        />

        <div className={styles.firstrow}>
          <input
            className={styles.input}
            type="text"
            value={name}
            placeholder="Citizen Name."
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={styles.secondrow}>
          <input
            className={styles.input}
            type="text"
            value={description}
            placeholder="What is your Citizen's story?"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className={styles.thirdrow}>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="Additional information"
          />
        </div>

        <div className={styles.buttonRow}>
          <button onClick={upload} className={styles.button}>
            Mint NFT
          </button>
        </div>
        <div className={styles.secondrow}></div>
      </div>

    </main>

    <footer className={styles.footer}>
      <p> iliacodes <a
        href="https://github.com/iliacodes"></a></p>
        </footer>
  </div>
);

}

