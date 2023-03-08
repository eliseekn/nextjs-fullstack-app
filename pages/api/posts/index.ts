import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "utils"
import {cors, ApiToken, UserRole} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    const postController = new PostController(req, res)

    switch (req.method) {
        case 'GET':
            const {page, limit} = req.query
            await postController.getCollection(parseInt(page as string), parseInt(limit as string))
            break
        case 'POST':
            await ApiToken(req, res)
            await UserRole(req, res)
            await postController.store(req.body)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
