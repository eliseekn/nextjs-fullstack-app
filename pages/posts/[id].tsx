import { _Head, Comment } from "@/components";
import { useRouter } from "next/router";
import useSWR from 'swr'
import { Post } from "../api/app/interfaces"
import Image from 'next/image'
import Link from 'next/link'

export default function PostDetails() {
    const {query} = useRouter()

    const { data } = useSWR<Post>(`/api/posts/${query.id}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

    console.log(data)

    return <>
        <_Head title={`Next.js Blog | ${data?.title}`} />

        <main className="container my-5" style={{ width: '45%' }}>
            <div className="d-flex justify-content-end mb-5">
                <Link href="/" className="btn btn-primary">
                    Go back
                </Link>
            </div>

            <article className="card mb-5">
                <Image src={`/upload/${data?.image}`} className="card-img-top" width="500" height="500" alt={data?.image as string} />
                
                <div className="card-body">
                    <h2 className="card-title">{data?.title}</h2>
                    <p className="card-text mt-3 text-justify">{data?.content}</p>
                </div>
            </article>  
            
            <Comment postId={data?.id as string} />
        </main>
    </>
}
