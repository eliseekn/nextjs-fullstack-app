import {NextApiResponse} from "next"
import {UserRepository, TokenRepository} from "@/pages/api/app/repositories"
import {Token, User} from "@/pages/api/app/interfaces"
const bcrypt = require('bcrypt')

export default class LoginController {
    private res: NextApiResponse
    private userRepository: UserRepository
    private tokenRepository: TokenRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.userRepository = new UserRepository()
        this.tokenRepository = new TokenRepository()
    }

    public authenticate = async (email: string, password: string) => {
        await this.userRepository
            .findOneBy('email', email)
            .then(async (user: User) => {
                if (!user) {
                    this.res.status(400).json({status: 'error'})
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    this.res.status(401).json({status: 'error'})
                }

                await this.tokenRepository
                    .create(user.id as string)
                    .then((token: Token) => {
                        this.res.status(200).json({
                            token: token.value,
                            user: user
                        })
                    })
                    .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
