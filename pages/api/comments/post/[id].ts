import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../../app/controllers"
import {middleware} from "utils"
import {cors} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    const commentController = new CommentController(res)

    if (req.method === 'GET') {
        const {id} = req.query
        const {page, limit} = req.query
        await commentController.getPostCollection(id as string, parseInt(page as string), parseInt(limit as string))
    }

    res.status(405).json({status: 'error'})
}
