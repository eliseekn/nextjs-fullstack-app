import { useRouter } from 'next/router'
import {FormEvent, useLayoutEffect, useRef, useState} from "react"
import { useCookies } from "react-cookie"

const Login = () => {
    const router = useRouter()

    const [cookie, setCookie] = useCookies(['user'])
    const [loading, showLoading] = useState<boolean>(false)
    const [alert, showAlert] = useState<boolean>(false)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

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
            const {user, token} = data
            
            user.token = token

            setCookie('user', JSON.stringify(user), {
                path: "/",
                sameSite: true,
            })

            await router.push('/dashboard')
        }

        showAlert(true)
        showLoading(false)
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
    </div>
}

export default Login