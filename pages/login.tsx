import { useRouter } from 'next/router'
import {FormEvent, useLayoutEffect, useRef, useState} from "react";

const Login = () => {
    const router = useRouter()

    const [loading, showLoading] = useState<boolean>(false)
    const [alert, showAlert] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        emailRef.current?.focus()
    })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        showLoading(true)

        const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({
                "email": emailRef.current!.value,
                "password": passwordRef.current!.value
            })
        })

        if (res.status != 200) {
            showAlert(true)
            showLoading(false)
        } else {
            localStorage.setItem('auth', JSON.stringify(res.json()))
            await router.push('/dashboard')
        }
    }

    return <div className="container py-5" style={{ width: 450 }}>
        <h1 className="pb-4 text-center">Log in</h1>

        {alert && <div className="alert alert-danger">
            Invalid email or password
        </div>}

        <div className="card shadow p-4">
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" required ref={emailRef} />
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Password</label>
                    <input type="password" id="password" name="password" className="form-control" required ref={passwordRef} />
                </div>

                <button type="submit" className="btn btn-dark">
                    {loading && <div className="spinner-border spinner-border-sm me-1" role="status"></div>} Log in
                </button>
            </form>
        </div>
    </div>
}

export default Login