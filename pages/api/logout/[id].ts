import type {NextApiRequest, NextApiResponse} from 'next'
import {LogoutController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers"
import {cors, auth} from "@/pages/api/app/middlewares"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)
    await middleware(req, res, auth)

    const logoutController = new LogoutController(res)

    if (req.method === 'POST') {
        await logoutController.logout(req.query.id as string)
    }

    res.status(405).json({status: 'error'})
}
