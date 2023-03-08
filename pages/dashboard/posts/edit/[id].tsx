import {Post, User} from "@/pages/api/app/interfaces"
import { toBase64 } from "@/utils"
import { useRouter } from "next/router"
import {FormEvent, useState, useRef, ChangeEvent, useEffect} from "react"
import useSWR from 'swr'
import Link from "next/link";
import {MyHead} from "@/components";

export default function Edit() {
    const router = useRouter()

    const [alertSuccess, showAlertSuccess] = useState<boolean>(false)
    const [alertError, showAlertError] = useState<boolean>(false)
    const [loading, showLoading] = useState<boolean>(false)
    const title = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    const [image, setImage] = useState<string>('')

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            router.push('/login')
        }

        const user: User = JSON.parse(localStorage.getItem('user') as string)

        if (user.role !== 'admin') {
            router.push('/')
        }
    })

    const { data } = useSWR<Post>(`/api/posts/${router.query.id}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

    const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImage(await toBase64(e.currentTarget.files![0]) as string)
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch(`/api/posts/${router.query.id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') as string
            },
            body: JSON.stringify({
                "title": title.current!.value,
                "content": content.current!.value,
                "image": image
            })
        })

        if (res.status === 200) {
            showAlertSuccess(true)
            const form = e.target as HTMLFormElement
            form.reset()
        } else {
            showAlertError(true)
        }

        showLoading(false)
    }

    return <>
        <MyHead title="Dashboard | Edit post" />

        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Edit post</h1>
                <Link href="/dashboard" className="btn btn-primary">
                    Posts
                </Link>
            </div>

            {alertSuccess && <div className="alert alert-success alert-dismissible fade show">
                Post has been edited successfully.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            {alertError && <div className="alert alert-danger alert-dismissible fade show">
                Fail to edit post.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" name="title" className="form-control" defaultValue={data?.title} required ref={title} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Image</label>
                            <input type="file" id="file" name="file" className="form-control" onChange={handleOnChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea id="content" name="content" className="form-control" defaultValue={data?.content} required ref={content}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {loading && <div className="spinner-border spinner-border-sm me-1" role="status"></div>} Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
}
