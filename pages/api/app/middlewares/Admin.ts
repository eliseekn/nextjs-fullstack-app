import type {NextApiRequest, NextApiResponse} from 'next'
import {TokenRepository, UserRepository} from "@/pages/api/app/repositories";

export const admin = (req: NextApiRequest, res: NextApiResponse) => {
    const tokenRepository = new TokenRepository()
    const userRepository = new UserRepository()

    const token = req.headers.authorization?.split(' ')[1]

    tokenRepository
        .findBy('token', token as string)
        .then(token => {
            userRepository
                .find(token.userId)
                .then(user => {
                    if (!user) {
                        res.status(403).json({status: 'error'})
                    }
                })
        })
}
