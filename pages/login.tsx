import Link from 'next/link'
import { useRouter } from 'next/router'
import {FormEvent, useEffect, useLayoutEffect, useRef, useState} from "react"
import {_Head} from "@/components";

const Login = () => {
    const router = useRouter()

    const [loading, showLoading] = useState<boolean>(false)
    const [alert, showAlert] = useState<boolean>(false)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            router.push('/dashboard')
        }
    })

    useLayoutEffect(() => {
        email.current?.focus()
    })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch('/api/login', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": email.current!.value,
                "password": password.current!.value
            })
        })

        if (res.status === 200) {
            const data = await res.json()

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)

            if (data.user.role === 'admin') {
                await router.push('/dashboard')
            } else {
                await router.push('/')
            }
        }

        showAlert(true)
        showLoading(false)
    }

    return  <>
        <_Head title="Log in" />

        <div className="container py-5" style={{ width: 450 }}>
            <h1 className="pb-4 text-center">Log in</h1>

            {alert && <div className="alert alert-danger">
                Invalid email or password
            </div>}

            <div className="card shadow p-4 mb-3">
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-control" required ref={email} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" required ref={password} />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {loading && <div className="spinner-border spinner-border-sm me-1" role="status"></div>} Log in
                    </button>
                </form>
            </div>

            <div className="d-flex justify-content-center">
                <Link href="/">Go back home</Link>
            </div>
        </div>
    </>
}

export default Login