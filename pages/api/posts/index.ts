import type {NextApiRequest, NextApiResponse} from 'next'
import {PostController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers";
import {cors} from "@/pages/api/app/middlewares/Cors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': return postController.getCollection()
        case 'POST': return postController.store(req.body)
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).json({status: 'error'})
    }
}
