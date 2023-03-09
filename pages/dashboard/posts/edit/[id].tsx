import {Post, User} from "@/pages/api/app/interfaces"
import { toBase64 } from "@/utils"
import { useRouter } from "next/router"
import {FormEvent, useState, useRef, ChangeEvent, useEffect} from "react"
import useSWR from 'swr'
import Link from "next/link";
import {Alert, AlertType, _Head} from "@/components";

export default function Edit() {
    const router = useRouter()

    const [alert, setAlert] = useState<AlertType>()
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
            const form = e.target as HTMLFormElement
            form.reset()
        }
        
        showLoading(false)
        setAlert({
            display: true,
            status: res.status,
            concern: 'post',
            action: 'edit'
        })
    }

    return <>
        <_Head title="Dashboard | Edit post" />

        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Edit post</h1>

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
