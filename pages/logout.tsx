import { useRouter } from 'next/router'
import {useEffect} from "react"

const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push('/login')
    })

    return <p>Redirecting...</p>
}

export default Logout