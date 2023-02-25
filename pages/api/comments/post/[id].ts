import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const commentController = new CommentController(res)

    if (req.method === 'GET') {
        return commentController.getPostCollection(req.query.id as string)
    }

    res.setHeader('Allow', ['GET'])
    res.status(405).json({status: 'error'})
}
