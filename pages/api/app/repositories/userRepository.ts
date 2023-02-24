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
        return db.data?.users
    }

    write = async (user: User) => {
        await db.read()
        user = this.userModel.set(user)
        db.data?.users?.push(user)
    }

    public find = async (id: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user.id === id)
        return users[0]
    }

    public findAll = async () => await this.read()

    public create = async (user: User) => {
        await this.write(user)
        return await db.write().then(async () => await this.read())
    }

    public update = async (id: string, newUser: User) => {
        let users: User[] = await this.read()

        users = users.map(user => {
            if (user.id === id) {
                newUser.id = id
                newUser.updatedAt = new Date().toISOString()
            }

            return this.userModel.set(newUser)
        })

        db.data = {users: users}
        return db.write().then(async () => await this.read())
    }

    public destroy = async (id: string) => {
        let users: User[] = await this.read()
        users = users.filter(user => user.id !== id)

        if (users.length === 0) {
            return users
        }

        db.data = {users: users}
        return db.write().then(async () => await this.read())
    }
}
