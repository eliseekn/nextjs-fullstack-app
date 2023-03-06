import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {FormEvent, useEffect, useState} from 'react'
import {truncate} from "@/utils";
import {PaginatePost, Post} from "@/pages/api/app/interfaces/PostInterface";
import { getToken } from '@/services';
import { getAuth } from '@/services/auth';

const Dashboard = (posts: PaginatePost, page: number, limit: number) => {
    // console.log(page)

    const router = useRouter()
    const [alert, showAlert] = useState(false)
    // const [posts, setPosts] = useState<PaginatePost>()
    // const [page, setPage] = useState<number>(1)
    // const [limit, setLimit] = useState<number>(15)

    useEffect(() => {
        const value = localStorage.getItem('user');
        const user = !!value ? JSON.parse(value) : undefined;

        if (!user) {
            router.push('/login')
        }

        if (user && user.role != 'admin') {
            router.push('/')
        }
    }, [])

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()

        const res = await fetch(`/api/post/${id}`, {method: 'DELETE'})

        if (res.status == 200) {
            showAlert(true)
            await router.push('/dashboard')
        }
    }

    return <>
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Posts ({posts?.items?.length})</h1>
                <Link href="/dashboard/create" className="btn btn-primary" target="_blank">
                    Create post
                </Link>
            </div>

            {alert && <div className="alert alert-success mb-3">
                Post has been deleted successfully
            </div>}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {/*<th scope="col">Image</th>*/}
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Published at</th>
                        <th scope="col">Edited at</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {posts?.items?.map((post: Post, i: number) => (
                    <tr key={i} className="align-middle">
                        <th scope="row">{i + 1}</th>
                        {/*<td><Image src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/${post.image}`} className="img-fluid" alt="Image de l'article" width="200" height="200" /></td>*/}
                        <td>{post.title}</td>
                        <td>{truncate(post.content, 290)}</td>
                        <td>{new Date(post.publishedAt as string).toLocaleDateString('en', { year: "numeric", month: "short", day: "numeric"})}</td>
                        <td>
                            {post.editedAt && new Date(post.editedAt as string).toLocaleDateString('en', { year: "numeric", month: "short", day: "numeric"})}
                            {!post.editedAt && '-'}
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <Link href={`/dashboard/comments/${post.id}`} title="Comments" target="_blank">
                                    <i className="bi bi-chat-fill text-primary"></i>
                                </Link>

                                <Link href={`/dashboard/edit/${post.slug}`} className="mx-2" title="Edit" target="_blank">
                                    <i className="bi bi-pencil-square text-primary"></i>
                                </Link>

                                <form onSubmit={e => handleOnSubmit(e, post.id as string)}>
                                    <button type="submit" title="Delete" className="btn px-0">
                                        <i className="bi bi-trash-fill text-danger"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav className="my-5">
                <ul className="pagination justify-content-center">
                    {posts?.page! > 1 && <li className="page-item">
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}>
                            &laquo;
                        </button>
                    </li>}

                    {posts?.totalPages! > 1 && <li className="page-item page-link text-primary">
                        Page {posts?.page!}/{posts?.totalPages!}
                    </li>}

                    {posts?.page! < posts?.totalPages! && <li className="page-item">
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${page + 1}&limit=${limit}`)}>
                            &raquo;
                        </button>
                    </li>}
                </ul>
            </nav>
        </div>
    </>
}

export async function getServerSideProps({ query: { page = 1, limit = 5 }, req: Request }) {
    const res = await fetch(`/api/posts?page=${page}&limit=${limit}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuth(req).token
        },
    })

    const posts = await res.json()

    return {
        props: {
            posts: posts,
            page: page,
            limit: limit
        }
    }
}

export default Dashboard