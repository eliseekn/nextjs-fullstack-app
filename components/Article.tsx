import {Post} from "@/pages/api/app/interfaces"
import Image from 'next/image'
import Link from 'next/link'
import {truncate} from "@/utils"

export default function Article({post}: {post: Post}) {
    return <article className="col mb-5">
        <div className="card shadow-sm h-100">
            <Image src={`/upload/${post.image}`} className="card-img-top" width={300} height={300} alt="Image de l'article" />

            <div className="card-body">
                <h2 className="card-title">{ post.title }</h2>
                <p className="card-text mt-3 text-justify">{ truncate(post.content, 290) }</p>

                <Link href={`/posts/${post.id}`} className="btn btn-primary stretched-link">
                    Read more
                </Link>
            </div>
        </div>
    </article>
}
