import type {NextApiRequest, NextApiResponse} from 'next'
import {UserController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, admin} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)
    await auth(req, res)
    await admin(req, res)

    const userController = new UserController(res)

    switch (req.method) {
        case 'GET': return userController.getItem(req.query.id as string)
        case 'PATCH': return userController.update(req.query.id as string, req.body)
        case 'DELETE': return userController.destroy(req.query.id as string)
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).json({status: 'error'})
    }
}
