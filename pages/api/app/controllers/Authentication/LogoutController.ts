import {NextApiResponse} from "next"
import {UserRepository, TokenRepository} from "@/pages/api/app/repositories"

export default class LogoutController {
    private res: NextApiResponse
    private userRepository: UserRepository
    private tokenRepository: TokenRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.userRepository = new UserRepository()
        this.tokenRepository = new TokenRepository()
    }

    public logout = (id: string) => {
        this.userRepository
            .find(id)
            .then(data => {
                if (!data) {
                    return this.res.status(400).json({status: 'error'})
                }

                return this.tokenRepository
                    .destroy(id)
                    .then(() => this.res.status(200).json({status: 'success'}))
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
