import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "utils"
import {cors, auth, role} from "@/pages/api/app/middlewares"
import { Post } from '../app/interfaces'

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

            const id = req.query.id
            let post = {
                "title": req.body.title, 
                "content": req.body.content,
                "image": req.body.image
            }

            await postController.update(id as string, post as Post)
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
