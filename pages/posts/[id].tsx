import { MyHead, Comment } from "@/components";
import { useRouter } from "next/router";
import useSWR from 'swr'
import { Post } from "../api/app/interfaces"
import Image from 'next/image'
import Link from 'next/link'

export default function PostDetails() {
    const router = useRouter()

    const { data } = useSWR<Post>(`/api/posts/${router.query.id}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

    return <>
        <MyHead title={`Next.js Blog | ${data?.title}`} />

        <main className="container my-5 w-50">
            <article className="card mb-5">
                <Image src={`upload/${data?.image}`} className="card-img-top" width="500" height="500" alt="Image de l'article" />
                
                <div className="card-body">
                    <h2 className="card-title">{data?.title}</h2>
                    <p className="card-text mt-3 text-justify">{data?.content}</p>
                    
                    <Link href="/">Go back home</Link>
                </div>
            </article>  
            
            <Comment post={data} />
        </main>
    </>
}
