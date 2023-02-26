import type {NextApiRequest} from 'next'
import {TokenRepository} from "@/pages/api/app/repositories"
import {Token} from "@/pages/api/app/interfaces"

export const apiToken = async (req: NextApiRequest) => {
    const authorization = req.headers.authorization?.split(' ')

    if (!authorization || authorization[0] !== 'Bearer') {
        return null
    }

    const tokenRepository = new TokenRepository()
    const apiToken: Token = await tokenRepository
        .findOne(authorization[1])
        .then((token: Token) => token)

    return apiToken;
}
