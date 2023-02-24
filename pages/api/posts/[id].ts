// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Post, User} from '../app/interfaces'
import {PostController} from "../app/controllers"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': return postController.getItem(req.query.id as string)
        case 'PATCH': return postController.update(req.query.id as string, req.body)
        case 'DELETE': return postController.destroy(req.query.id as string)
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
