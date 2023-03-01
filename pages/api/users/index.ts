import type {NextApiRequest, NextApiResponse} from 'next'
import {UserController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, role, auth} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)
    await middleware(req, res, auth)
    await middleware(req, res, role)

    const userController = new UserController(res)

    switch (req.method) {
        case 'GET': await userController.getCollection()
        case 'POST': await userController.store(req.body)
        default: res.status(405).json({status: 'error'})
    }
}
