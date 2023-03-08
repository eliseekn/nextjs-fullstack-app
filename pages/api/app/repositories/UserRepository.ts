import db from '../database'
import {User, Repository} from '../interfaces'
import {UserModel} from '../models'
import { paginate } from 'utils'

export default class UserRepository implements Repository {
    private userModel: UserModel

    constructor () {
        this.userModel = new UserModel()
    }

    read = async () => {
        await db.read()
        return db.data?.users ?? []
    }

    write = async (data: {users: User[]}) => {
        Object.assign(db.data as Object, {users: data.users})
        return await db.write()
    }

    add = async (user: User) => {
        let users = await this.read()
        users.push(this.userModel.set(user))

        return await this.write({users: users})
    }

    findOne = async (id: string) => await this.findOneBy('id', id)

    findOneBy = async (key: string, value: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user[key as keyof User] === value)
        return users[0]
    }

    findAll = async () => await this.read()

    findAllPaginate = async (page: number = 1, limit: number = 15) => {
        const users: User[] = await this.findAll()
        return paginate(users as [], page, limit)
    }

    findAllBy = async (key: string, value: string) => {
        let users: User[] = await this.read()
        return users.filter(user => user[key as keyof User] === value)
    }

    create = async (user: User) => await this.add(user).then(async () => await this.read())

    update = async (id: string, newUser: User) => {
        let users: User[] = await this.read()

        users = users.map(user => {
            if (user.id === id) {
                newUser.updatedAt = new Date().toISOString()
                return this.userModel.set({...user, ...newUser})
            }

            return user
        })

        return await this.write({users: users}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user.id !== id)

        return await this.write({users: users}).then(async () => await this.read())
    }
}
