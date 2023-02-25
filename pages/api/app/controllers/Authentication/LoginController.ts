import {NextApiResponse} from "next"
import {UserRepository, TokenRepository} from "@/pages/api/app/repositories"
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

    public authenticate = ({email, password}: {email: string, password: string}) => {
        this.userRepository
            .findBy('email', email)
            .then(data => {
                if (!data) {
                    return this.res.status(400).json({status: 'error'})
                }

                if (!bcrypt.compareSync(password, data.password)) {
                    return this.res.status(401).json({status: 'error'})
                }

                return this.tokenRepository
                    .create(data.id as string)
                    .then(token => {
                        return this.res.status(200).json({
                            token: token.value,
                            user: data
                        })
                    })
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
