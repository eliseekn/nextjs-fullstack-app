import useSWR from 'swr'
import {Comment as CommentI} from "@/pages/api/app/interfaces"
import { useState, FormEvent, useRef } from "react"
import {useRouter} from "next/router"
import {Alert, AlertType} from "@/components"

export default function Comment({postId}: {postId: string}) {
    const router = useRouter()

    const [alert, setAlert] = useState<AlertType>()
    const [loading, showLoading] = useState<boolean>(false)
    const email = useRef<HTMLInputElement>(null)
    const message = useRef<HTMLTextAreaElement>(null)

    const { data } = useSWR<CommentI[]>(`/api/comments/post/${postId}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch('/api/comments', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') as string
            },
            body: JSON.stringify({
                "postId": postId,
                "email": email.current!.value,
                "message": message.current!.value
            })
        })

        if (res.status === 200) {
            router.reload()
        }

        showLoading(false)
        setAlert({
            display: true,
            status: res.status,
            concern: 'comment',
            action: 'create'
        })
    }

    return <>
        <h3 className="mb-3">Comments ({data?.length ?? 0})</h3>

        <div className="mt-3">
            {data?.map((comment: CommentI) => (
                <div key={comment.id} className="mb-3">
                    <p className="fw-bold mb-1">{comment.email}</p>
                    <p className="mb-0">{comment.message}</p>
                </div>
            ))}
        </div>

        <h4 className="mt-5">Leave a comment</h4>

        {alert && <Alert display={alert.display} status={alert.status} concern={alert.concern} action={alert.action} />}

        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Author</label>
                <input type="email" id="email" name="email" className="form-control" required ref={email} />
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" className="form-control" required ref={message}></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
                {loading && <div className="spinner-border spinner-border-sm me-1" role="status"></div>} Save
            </button>
        </form>
    </>
}