import { useRouter } from 'next/router'
import Link from 'next/link'
import {FormEvent, useEffect, useState} from 'react'
import {Pagination, Comment, User} from "@/pages/api/app/interfaces"
import useSWR from 'swr'
import {Alert, AlertType, _Head} from "@/components";

export default function Comments({page, limit}: {page: number, limit: number}) {
    const router = useRouter()
    const [alert, setAlert] = useState<AlertType>()

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            router.push('/login')
        }

        const user: User = JSON.parse(localStorage.getItem('user') as string)

        if (user.role !== 'admin') {
            router.push('/')
        }
    })

    const { data } = useSWR<Pagination>(`/api/comments/post/${router.query.postId}?page=${page}&limit=${limit}`, async (url: string) => {
        return fetch(url, {
            headers: {"Authorization": "Bearer " + localStorage.getItem('token') as string}
        })
            .then(res => res.json())
    })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()

        if (!confirm("Are you sure you want to delete this comment ?")) {return}

        const res = await fetch(`/api/comments/${id}`, {
            method: 'delete',
            headers: {"Authorization": "Bearer " + localStorage.getItem('token') as string}
        })

        if (res.status === 200) {
            return router.reload()
        }

        setAlert({
            display: true,
            status: res.status,
            concern: 'comment',
            action: 'delete'
        })
    }

    return <>
        <_Head title="Dashboard | Edit post" />

        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Comments ({data?.items?.length ?? 0})</h1>

                <div className="d-flex align-items-center">
                    <Link href="/" className="btn btn-primary me-3">
                        Home
                    </Link>
                    <Link href="/dashboard" className="btn btn-dark">
                        Go back
                    </Link>
                </div>
            </div>

            {alert && <Alert display={alert.display} status={alert.status} concern={alert.concern} action={alert.action} />}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Author</th>
                        <th scope="col">Message</th>
                        <th scope="col">Published at</th>
                        <th scope="col">Edited at</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {data?.items?.map((comment: Comment, i: number) => (
                    <tr key={i} className="align-middle">
                        <th scope="row">{i + 1}</th>
                        <td>{comment.email}</td>
                        <td>{comment.message}</td>
                        <td>{new Date(comment.publishedAt as string).toLocaleDateString('en', { year: "numeric", month: "short", day: "numeric"})}</td>
                        <td>
                            {comment.editedAt && new Date(comment.editedAt as string).toLocaleDateString('en', { year: "numeric", month: "short", day: "numeric"})}
                            {!comment.editedAt && '-'}
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <form onSubmit={e => handleOnSubmit(e, comment.id as string)}>
                                    <button type="submit" title="Delete" className="btn px-0 border-0">
                                        <i className="bi bi-trash2-fill text-danger"></i>
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
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${data?.page! - 1}&limit=${limit}`)}>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </li>}

                    {data?.totalPages! > 1 && <li className="page-item page-link text-primary">
                        Page {data?.page!}/{data?.totalPages!}
                    </li>}

                    {data?.page! < data?.totalPages! && <li className="page-item">
                        <button className="page-link text-primary" onClick={() => router.push(`?page=${data?.page! + 1}&limit=${limit}`)}>
                            <i className="bi bi-arrow-right"></i>
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
