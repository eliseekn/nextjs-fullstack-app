import type {NextApiRequest, NextApiResponse} from 'next'

//https://gist.github.com/mathewbyrne/1280286
export const slugify = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

//https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
export const middleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}