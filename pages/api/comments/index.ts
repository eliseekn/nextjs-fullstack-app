import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, hasRole} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const commentController = new CommentController(res)

    switch (req.method) {
        case 'GET': {
            const token = await auth(req, res)
            await hasRole(res, token as string)

            return commentController.getCollection()
        }
        case 'POST': {
            await auth(req, res)
            return commentController.store(req.body)
        }
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).json({status: 'error'})
    }
}
