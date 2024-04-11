import Image from "next/image";
import Head from 'next/head'
import styles from './styles/Home.module.css'
import Participant from './components/Participant';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mock Zoom Call</title>
        <meta name="description" content="Mock Zoom Call" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to your mock interview
        </h1>

        <div className={styles.grid}>
          <Participant name="Participant 1" />
          <Participant name="Participant 2" />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  )
}