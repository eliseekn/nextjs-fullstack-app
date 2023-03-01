import {NextApiResponse} from "next"
import {User} from "@/pages/api/app/interfaces"
import {UserRepository} from "@/pages/api/app/repositories"

export default class UserController {
    private res: NextApiResponse
    private userRepository: UserRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.userRepository = new UserRepository()
    }

    public getCollection = async () => {
        await this.userRepository
            .findAll()
            .then((users: User[]) => this.res.status(200).json(users))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getItem = async (id: string) => {
        await this.userRepository
            .findOne(id)
            .then((user: User) => {
                if (!user) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json(user)
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public store = async (user: User) => {
        await this.userRepository
            .create(user)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public update = async (id: string, user: User) => {
        await this.userRepository
            .update(id, user)
            .then((users: User[]) => {
                if (!users) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public destroy = async (id: string) => {
        await this.userRepository
            .destroy(id)
            .then((users: User[]) => {
                if (!users) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
