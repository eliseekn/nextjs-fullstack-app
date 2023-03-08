import type {NextApiRequest, NextApiResponse} from 'next'
import {CommentController} from "../app/controllers"
import {middleware} from "utils"
import {cors, ApiToken, UserRole} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    const commentController = new CommentController(res)

    switch (req.method) {
        case 'GET':
            await ApiToken(req, res)
            await UserRole(req, res)
            await commentController.getCollection()
            break
        case 'POST':
            await ApiToken(req, res)
            await commentController.store(req.body)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
