import type {NextApiRequest} from 'next'
import {TokenRepository, UserRepository} from "@/pages/api/app/repositories"
import {Token, User} from "@/pages/api/app/interfaces"

export const Auth = async (req: NextApiRequest) => {
    const authorization = req.headers.authorization?.split(' ')

    if (!authorization || authorization.length !== 2) {return null}

    const userRepository = new UserRepository()
    const tokenRepository = new TokenRepository()

    const token: Token = await tokenRepository
        .findOne(authorization[1])
        .then((token: Token) => token)

    if (!token) {return null}

    return await userRepository
        .findOne(token.userId)
        .then((user: User) => user)
}
