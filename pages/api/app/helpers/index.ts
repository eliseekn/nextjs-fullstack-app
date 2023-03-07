import type {NextApiRequest, NextApiResponse} from 'next'

//https://gist.github.com/mathewbyrne/1280286
export const slugify = (text: string) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

//https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts
export const middleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const paginate = (items: [], page: number, limit: number) => {
    const totalPages: number = Math.ceil(items.length / limit)

    if (page > totalPages) {
        page = totalPages
    }

    return {
        page: page,
        totalPages: totalPages,
        items: items.slice((page * limit) - limit, page * limit)
    }
}

//https://stackoverflow.com/a/57272491
export const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})
