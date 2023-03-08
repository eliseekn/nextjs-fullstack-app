import { Post } from "@/pages/api/app/interfaces"
import { toBase64 } from "@/utils"
import { useRouter } from "next/router"
import { FormEvent, useState, useRef, ChangeEvent } from "react"
import useSWR from 'swr'

export default function Edit() {
    const { query } = useRouter()

    const [alertSuccess, showAlertSuccess] = useState<boolean>(false)
    const [alertError, showAlertError] = useState<boolean>(false)
    const [loading, showLoading] = useState<boolean>(false)
    const title = useRef<HTMLInputElement>(null)
    const content = useRef<HTMLTextAreaElement>(null)
    const [image, setImage] = useState<string>('')

    const { data } = useSWR<Post>(`/api/posts/${query.id}`, async (url: string) => {
        return fetch(url, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
    })

    const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setImage(await toBase64(e.currentTarget.files![0]) as string)
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch(`/api/posts/${query.id}`, {
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
        } else {
            showAlertError(true)
        }

        showLoading(false)
    }

    return <div className="container mt-5">
        <h1 className="mb-5">Edit post</h1>

        {alertSuccess && <div className="alert alert-success alert-dismissible fade show">
            Post has been edited successfully <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}

        {alertError && <div className="alert alert-danger alert-dismissible fade show">
            Failed to edit post <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
}
