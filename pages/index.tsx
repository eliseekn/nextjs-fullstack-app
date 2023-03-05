import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
    return <>
            <Head>
                <title>Next.js Blog</title>
                <meta name="description" content="Next.js Blog" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.main}>
                <h1>Next.js Blog</h1>
            </main>
    </>
}
