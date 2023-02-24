import type { NextApiRequest, NextApiResponse } from 'next'
import {UserController} from "../app/controllers"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userController = new UserController(res)

    switch (req.method) {
        case 'GET': return userController.getItem(req.query.id as string)
        case 'PATCH': return userController.update(req.query.id as string, req.body)
        case 'DELETE': return userController.destroy(req.query.id as string)
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
