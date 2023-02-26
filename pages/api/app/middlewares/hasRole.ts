import {TokenRepository, UserRepository} from "@/pages/api/app/repositories";
import {Token, User} from "@/pages/api/app/interfaces";

export const hasRole = async (apiToken?: string, role: string = 'admin') => {
    if (!apiToken) {
        return false
    }

    const userRepository = new UserRepository()
    const tokenRepository = new TokenRepository()

    const token: Token = await tokenRepository
        .findOne(apiToken)
        .then((token: Token) => token)

    if (!token) {
        return false
    }

    const user: User = await userRepository
        .findOne(token.userId)
        .then((user: User) => user)

    return !user || user.role !== role
}
