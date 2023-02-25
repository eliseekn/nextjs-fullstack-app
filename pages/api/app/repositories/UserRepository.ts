import db from '../database'
import {User, Repository} from '../interfaces'
import {UserModel} from '../models'

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

    find = async (id: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user.id === id)
        return users[0]
    }

    findBy = async (key: string, value: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user[key as keyof User] === value)
        return users[0]
    }

    findAll = async () => await this.read()

    create = async (user: User) => await this.add(user).then(async () => await this.read())

    update = async (id: string, newUser: User) => {
        let users: User[] = await this.read()

        users = users.map(user => {
            if (user.id === id) {
                newUser.id = id
                newUser.updatedAt = new Date().toISOString()
            }

            return this.userModel.set(newUser)
        })

        return await this.write({users: users}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user.id !== id)

        return await this.write({users: users}).then(async () => await this.read())
    }
}
