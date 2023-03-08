import { toBase64 } from "@/utils"
import {FormEvent, useState, useLayoutEffect, useRef, ChangeEvent, useEffect} from "react"
import Link from "next/link";
import {User} from "@/pages/api/app/interfaces";
import {useRouter} from "next/router";

export default function Create() {
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

    useLayoutEffect(() => {
        title.current?.focus()
    })

    const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImage(await toBase64(e.currentTarget.files![0]) as string)
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch('/api/posts', {
            method: 'post',
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

    return <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
            <h1>Create post</h1>
            <Link href="/dashboard" className="btn btn-primary">
                Posts
            </Link>
        </div>

        {alertSuccess && <div className="alert alert-success alert-dismissible fade show">
            Post has been created successfully.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}

        {alertError && <div className="alert alert-danger alert-dismissible fade show">
            Fail to create post.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}

        <div className="card shadow-sm">
            <div className="card-body">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" id="title" name="title" className="form-control" required ref={title} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Image</label>
                        <input type="file" id="file" name="file" className="form-control" required onChange={handleOnChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea id="content" name="content" className="form-control" required ref={content}></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {loading && <div className="spinner-border spinner-border-sm me-1" role="status"></div>} Save
                    </button>
                </form>
            </div>
        </div>
    </div> 
}
