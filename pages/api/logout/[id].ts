import type {NextApiRequest, NextApiResponse} from 'next'
import {LogoutController} from "../app/controllers"
import {middleware} from "@/pages/api/app/helpers";
import {cors} from "@/pages/api/app/middlewares/Cors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const logoutController = new LogoutController(res)

    if (req.method === 'POST') {
        return logoutController.logout(req.query.id as string)
    }

    res.setHeader('Allow', ['POST'])
    res.status(405).json({status: 'error'})
}
