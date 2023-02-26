import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository} from "@/pages/api/app/repositories"
import {Token} from "@/pages/api/app/interfaces"

export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.authorization || req.headers.authorization?.split(' ')[0] !== 'Bearer') {
        return res.status(403).json({status: 'error'})
    }

    const tokenRepository = new TokenRepository()
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(403).json({status: 'error'})
    }

    return await tokenRepository
        .findOne(token)
        .then((token: Token) => token)
}
