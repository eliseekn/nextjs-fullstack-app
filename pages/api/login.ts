import type {NextApiRequest, NextApiResponse} from 'next'
import {LoginController} from "./app/controllers"
import {middleware} from "@/pages/api/app/helpers";
import {cors} from "@/pages/api/app/middlewares/Cors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await middleware(req, res, cors)

    const loginController = new LoginController(res)

    if (req.method === 'POST') {
        return loginController.authenticate(req.body)
    }

    res.setHeader('Allow', ['POST'])
    res.status(405).json({status: 'error'})
}
