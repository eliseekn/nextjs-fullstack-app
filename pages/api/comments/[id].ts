import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../app/controllers"
import {middleware} from "utils"
import {cors, ApiToken} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    const commentController = new CommentController(res)

    switch (req.method) {
        case 'GET':
            await commentController.getItem(req.query.id as string)
            break
        case 'PUT':
            await ApiToken(req, res)
            await commentController.update(req.query.id as string, req.body)
            break
        case 'DELETE':
            await ApiToken(req, res)
            await commentController.destroy(req.query.id as string)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
