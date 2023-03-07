import type {NextApiRequest, NextApiResponse} from 'next'
import {LogoutController} from "../app/controllers"
import {middleware} from "utils"
import {cors, auth} from "@/pages/api/app/middlewares"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await middleware(req, res, cors)
    await auth(req, res)

    const logoutController = new LogoutController(res)
    const {id} = req.query

    if (req.method === 'POST') {
        await logoutController.logout(id as string)
    }

    res.status(405).json({status: 'error'})
}
