import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository} from "@/pages/api/app/repositories";

export const auth = (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.authorization) {
        res.status(403).json({status: 'error'})
    }

    const tokenRepository = new TokenRepository()
    const token = req.headers.authorization?.split(' ')[1]

    tokenRepository
        .findBy('token', token as string)
        .then(token => {
            if (!token) {
                res.status(403).json({status: 'error'})
            }
        })
}
