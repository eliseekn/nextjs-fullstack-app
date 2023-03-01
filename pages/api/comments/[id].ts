import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const commentController = new CommentController(res)

    switch (req.method) {
        case 'GET': await commentController.getItem(req.query.id as string)
        case 'PATCH': {
            await middleware(req, res, auth)
            await commentController.update(req.query.id as string, req.body)
        }
        case 'DELETE': {
            await middleware(req, res, auth)
            await commentController.destroy(req.query.id as string)
        }
        default: res.status(405).json({status: 'error'})
    }
}
