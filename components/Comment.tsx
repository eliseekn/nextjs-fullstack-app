import useSWR from 'swr'
import {Comment as CommentInterface} from "@/pages/api/app/interfaces"
import { useState, FormEvent, useRef } from "react";
import {useRouter} from "next/router";

export default function Comment({postId}: {postId: string}) {
    const router = useRouter()

    const [alert, showAlert] = useState<boolean>(false)
    const [loading, showLoading] = useState<boolean>(false)
    const email = useRef<HTMLInputElement>(null)
    const message = useRef<HTMLTextAreaElement>(null)

    const { data } = useSWR<CommentInterface[]>(`/api/comments/post/${postId}`, async (url: string) => {
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
            await router.reload()
        } else {
            showAlert(true)
        }

        showLoading(false)
    }

    return <>
        <h3 className="mb-3">Comments ({data?.length ?? 0})</h3>

        <div className="mt-3">
            {data?.map((comment: CommentInterface) => (
                <div key={comment.id} className="mb-3">
                    <p className="fw-bold mb-1">{comment.email}</p>
                    <p className="mb-0">{comment.message}</p>
                </div>
            ))}
        </div>

        <h4 className="mt-5">Leave a comment</h4>

        {alert && <div className="alert alert-danger alert-dismissible fade show">
            Fail to create comment.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}

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