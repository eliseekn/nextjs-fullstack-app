import {NextApiResponse} from "next"
import {UserRepository, TokenRepository} from "@/pages/api/app/repositories"
import {User} from "@/pages/api/app/interfaces";

export default class LogoutController {
    private res: NextApiResponse
    private userRepository: UserRepository
    private tokenRepository: TokenRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.userRepository = new UserRepository()
        this.tokenRepository = new TokenRepository()
    }

    public logout = async (id: string) => {
        return await this.userRepository
            .findOne(id)
            .then(async (user: User) => {
                if (!user) {
                    return this.res.status(404).json({status: 'error'})
                }

                return await this.tokenRepository
                    .destroy(id)
                    .then(() => this.res.status(200).json({status: 'success'}))
                    .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
