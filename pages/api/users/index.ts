import type {NextApiRequest, NextApiResponse} from 'next'
import {UserController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, role, auth} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)
    await auth(req, res)
    await role(req, res)

    const userController = new UserController(res)

    switch (req.method) {
        case 'GET':
            await userController.getCollection()
            break
        case 'POST':
            await userController.store(req.body)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
