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

    public getCollection = () => {
        this.userRepository
            .findAll()
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public getItem = (id: string) => {
        this.userRepository
            .find(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json(data)
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public store = (user: User) => {
        this.userRepository
            .create(user)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public update = (id: string, user: User) => {
        this.userRepository
            .update(id, user)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public destroy = (id: string) => {
        this.userRepository
            .destroy(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }
}
