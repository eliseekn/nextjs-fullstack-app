import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "utils"
import {cors, auth, role} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    const postController = new PostController(res)

    switch (req.method) {
        case 'GET':
            await postController.getItem(req.query.id as string)
            break
        case 'PATCH':
            await auth(req, res)
            await role(req, res)
            await postController.update(req.query.id as string, req.body)
            break
        case 'DELETE':
            await auth(req, res)
            await role(req, res)
            await postController.destroy(req.query.id as string)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
