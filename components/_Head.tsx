import Head from "next/head"

export default function _Head({title, description}: {title: string, description?: string}) {
    return <Head>
        <title>{title}</title>
        <meta name="description" content={description ?? title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
}
