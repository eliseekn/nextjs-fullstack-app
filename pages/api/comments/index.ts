import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, role} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const commentController = new CommentController(res)

    switch (req.method) {
        case 'GET': {
            await middleware(req, res, auth)
            await middleware(req, res, role)
            await commentController.getCollection()
        }
        case 'POST': {
            await middleware(req, res, auth)
            await commentController.store(req.body)
        }
        default: res.status(405).json({status: 'error'})
    }
}
