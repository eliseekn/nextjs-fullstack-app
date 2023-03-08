import type {NextApiRequest, NextApiResponse} from 'next'
import {UserController} from "../app/controllers"
import {middleware} from "utils"
import {cors, ApiToken, UserRole} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    await ApiToken(req, res)
    await UserRole(req, res)

    const userController = new UserController(res)

    switch (req.method) {
        case 'GET':
            await userController.getItem(req.query.id as string)
            break
        case 'PUT':
            await userController.update(req.query.id as string, req.body)
            break
        case 'DELETE':
            await userController.destroy(req.query.id as string)
            break
        default:
            res.status(405).json({status: 'error'})
            break
    }
}
