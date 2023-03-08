import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository, UserRepository} from "@/pages/api/app/repositories"
import {Token, User} from "@/pages/api/app/interfaces"

export const UserRole = async (req: NextApiRequest, res: NextApiResponse, role: string = 'admin') => {
    const authorization = req.headers.authorization?.split(' ')

    if (!authorization || authorization.length !== 2) {
        return res.status(403).json({status: 'error'})
    }

    const userRepository = new UserRepository()
    const tokenRepository = new TokenRepository()

    const token: Token = await tokenRepository
        .findOne(authorization[1])
        .then((token: Token) => token)

    if (!token) {
        return res.status(403).json({status: 'error'})
    }

    const user: User = await userRepository
        .findOne(token.userId)
        .then((user: User) => user)

    if (!user || user.role !== role) {
        return res.status(403).json({status: 'error'})
    }

    return user
}
