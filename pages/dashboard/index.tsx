import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {FormEvent, useEffect, useState} from 'react'
import {truncate} from "@/utils"
import {Pagination, Post, User} from "@/pages/api/app/interfaces"
import useSWR from 'swr'

const Dashboard = ({page, limit}: {page: number, limit: number}) => {
    const router = useRouter()
    const [alert, showAlert] = useState(false)

    const { data } = useSWR<Pagination>(`/api/posts?page=${page}&limit=${limit}`, async (url: string) => {
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('user') as string
            }
        })
            .then(res => res.json())
    })

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            router.push('/login')
        }

        const user: User = JSON.parse(localStorage.getItem('user') as string)

        if (user.role != 'admin') {
            router.push('/')
        }
    })

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
                <h1>Posts ({data?.items?.length})</h1>
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
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Published at</th>
                        <th scope="col">Edited at</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {data?.items?.map((post: Post, i: number) => (
                    <tr key={i} className="align-middle">
                        <th scope="row">{i + 1}</th>
                        <td><Image src={`/upload/${post.image}`} className="img-fluid" alt="Image de l'article" width="200" height="200" /></td>
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
                    {data?.page! > 1 && <li className="page-item">
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}>
                            &laquo;
                        </button>
                    </li>}

                    {data?.totalPages! > 1 && <li className="page-item page-link text-primary">
                        Page {data?.page!}/{data?.totalPages!}
                    </li>}

                    {data?.page! < data?.totalPages! && <li className="page-item">
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${page + 1}&limit=${limit}`)}>
                            &raquo;
                        </button>
                    </li>}
                </ul>
            </nav>
        </div>
    </>
}

export async function getServerSideProps({ query: { page = 1, limit = 15 } }) {
    return {
        props: {
            page: page,
            limit: limit
        }
    }
}

export default Dashboard
