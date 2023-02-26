import type {NextApiResponse} from 'next'
import {TokenRepository, UserRepository} from "@/pages/api/app/repositories";
import {Token, User} from "@/pages/api/app/interfaces";

export const hasRole = async (res: NextApiResponse, bearerToken: string, role: string = 'admin') => {
    if (!bearerToken) {
        return res.status(403).json({status: 'error'})
    }

    const userRepository = new UserRepository()
    const tokenRepository = new TokenRepository()

    return await tokenRepository
        .findOne(bearerToken)
        .then(async (token: Token) => {
            await userRepository
                .findOne(token.userId)
                .then((user: User) => {
                    if (!user || user.role !== role) {
                        return res.status(403).json({status: 'error'})
                    }
                })
        })
}
