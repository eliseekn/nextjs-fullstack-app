// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Post, User} from '../app/interfaces'
import {PostController} from "../app/controllers";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[] | User[] | {}>
) {
    const postController = new PostController(res)

    switch (req.method) {
        case 'GET': return postController.getCollection()
        case 'POST': return postController.store(req.body)
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
