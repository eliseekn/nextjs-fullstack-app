import {MyHead, Article} from "@/components"
import {useRouter} from "next/router"
import useSWR from "swr"
import {Pagination, Post, User} from "@/pages/api/app/interfaces"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home({page, limit}: {page: number, limit: number}) {
    const router = useRouter()
    const [notAuth, setNotAuth] = useState<boolean>(false)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        setNotAuth(!localStorage.getItem('token') as boolean)
        setUser(JSON.parse(localStorage.getItem('user') as string) as User)
    }, [])

    const { data } = useSWR<Pagination>(`/api/posts?page=${page}&limit=${limit}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

    return <>
        <MyHead title="Next.js Blog" />

        <main className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Next.js Blog</h1>

                {notAuth && <Link href="/login" className="btn btn-primary">Log in</Link>}

                {!notAuth && <div className="d-flex align-items-center">
                    {user?.role === 'admin' &&<Link href="/dashboard" className="btn btn-primary me-3">Dashboard</Link>}
                    <Link href="/logout" className="btn btn-danger">Log out</Link>
                </div>}
            </div>

            <section className="my-5">
                <div className="row row-cols-3">
                    {data?.items.map((post: Post) => (
                        <Article key={post.id} post={post} />
                    ))}
                </div>

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
            </section>
        </main>
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
