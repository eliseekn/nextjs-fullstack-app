import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "utils"
import {cors, ApiToken, UserRole} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)

    const id = req.query.id
    const postController = new PostController(req, res)

    switch (req.method) {
        case 'GET':
            await postController.getItem(id as string)
            break
        case 'PUT':
            await ApiToken(req, res)
            await UserRole(req, res)
            await postController.update(id as string, req.body)
            break
        case 'DELETE':
            await ApiToken(req, res)
            await UserRole(req, res)
            await postController.destroy(id as string)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
