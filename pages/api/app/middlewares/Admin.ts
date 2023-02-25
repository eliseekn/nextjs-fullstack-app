import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository, UserRepository} from "@/pages/api/app/repositories";

export const admin = async (req: NextApiRequest, res: NextApiResponse) => {
    const tokenRepository = new TokenRepository()
    const userRepository = new UserRepository()
    const token = req.headers.authorization?.split(' ')[1]

    return await tokenRepository
        .findOne(token as string)
        .then(_token => {
            userRepository
                .findOne(_token.userId)
                .then(user => {
                    if (!user) {
                        res.status(403).json({status: 'error'})
                    }
                })
        })
}
