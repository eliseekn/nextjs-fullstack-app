import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository} from "@/pages/api/app/repositories"
import {Token} from "@/pages/api/app/interfaces"

export const ApiToken = async (req: NextApiRequest, res: NextApiResponse) => {
    const authorization = req.headers.authorization?.split(' ')

    if (!authorization || authorization[0] !== 'Bearer') {
        return res.status(403).json({status: 'error'})
    }

    const tokenRepository = new TokenRepository()
    const apiToken: Token = await tokenRepository
        .findOne(authorization[1])
        .then((token: Token) => token)

    if (!apiToken) {
        return res.status(403).json({status: 'error'})
    }
}
