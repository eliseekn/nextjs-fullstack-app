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
        case 'GET': return commentController.getItem(req.query.id as string)
        case 'PATCH': {
            await auth(req, res)
            return commentController.update(req.query.id as string, req.body)
        }
        case 'DELETE': {
            await auth(req, res)
            return commentController.destroy(req.query.id as string)
        }
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).json({status: 'error'})
    }
}
