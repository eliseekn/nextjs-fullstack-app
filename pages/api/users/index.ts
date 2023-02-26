import type {NextApiRequest, NextApiResponse} from 'next'
import {UserController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth, hasRole} from "@/pages/api/app/middlewares"
import {Token} from "@/pages/api/app/interfaces";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const userController = new UserController(res)

    switch (req.method) {
        case 'GET': {
            await auth(req, res).then(async (token) => {
                if (typeof token === 'string') {
                    return res.status(403).json({status: 'error'})
                }

                return await hasRole(res, token as Token)
            })

            return await userController.getCollection()
        }
        case 'POST': {
            await auth(req, res).then(async (token) => {
                if (typeof token !== 'string') {
                    return res.status(403).json({status: 'error'})
                }

                return await hasRole(res, token as string)
            })

            return await userController.store(req.body)
        }
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).json({status: 'error'})
    }
}
