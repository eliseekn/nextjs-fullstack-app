import useSWR from 'swr'
import {Post, Comment as CommentInterface} from "@/pages/api/app/interfaces"
import { useState, FormEvent, useRef } from "react";

export default function Comment({post}: {post: Post}) {
    const [alertSuccess, showAlertSuccess] = useState<boolean>(false)
    const [alertError, showAlertError] = useState<boolean>(false)
    const [loading, showLoading] = useState<boolean>(false)
    const email = useRef<HTMLInputElement>(null)
    const message = useRef<HTMLTextAreaElement>(null)

    const { data } = useSWR<CommentInterface[]>(`/api/comments/${post.id}`, async (url: string) => {
        return fetch(url).then(res => res.json())
    })

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
                "email": email.current!.value,
                "message": message.current!.value
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
        <h3 className="mb-3">Comments ({data?.length ?? 0})</h3>

        <div className="mt-3">
            {data?.map((comment: CommentInterface) => (
                <div key={comment.id}>
                    <p className="fw-bold">{comment.email}</p>
                    <p className="fst-italic">{comment.message}</p> 
                </div>
            ))}
        </div>

        <h4 className="mt-5">Leave a comment</h4>

        {alertSuccess && <div className="alert alert-success alert-dismissible fade show">
            Comment has been created successfully.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}

        {alertError && <div className="alert alert-danger alert-dismissible fade show">
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