import type { NextApiRequest, NextApiResponse } from 'next'
import {UserController} from "../app/controllers"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userController = new UserController(res)

    switch (req.method) {
        case 'GET': return userController.getCollection()
        case 'POST': return userController.store(req.body)
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
