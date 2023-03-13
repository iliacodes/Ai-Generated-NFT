import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');


  return (
    <>
      <div>
        <div>
          <input>
            className={styles.input}
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          </input>
        </div>
        <div>
          <input
            className={styles.input}
            type="text"
            value={description}
            placeholder="Description for the NFT"
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        </div>
        <label className={styles.inputLabel}>
          <input
          className={styles.inputBox}
          type="file"
          onChange={(event) => setImage(event.target.files[0])}
          ></input>
        </label>
      </div>
    </>
  )
}
