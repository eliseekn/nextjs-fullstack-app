import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, role} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': await postController.getItem(req.query.id as string)
        case 'PATCH': {
            await middleware(req, res, auth)
            await middleware(req, res, role)

            await postController.update(req.query.id as string, req.body)
        }
        case 'DELETE': {
            await middleware(req, res, auth)
            await middleware(req, res, role)

            await postController.destroy(req.query.id as string)
        }
        default: res.status(405).json({status: 'error'})
    }
}
