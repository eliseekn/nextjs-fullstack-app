import { parse } from 'cookie'

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617
export const getAuth = (req) => {
    let user = parse(req ? req.headers.cookie || "" : document.cookie).user ?? null
    return JSON.parse(user) || null
}