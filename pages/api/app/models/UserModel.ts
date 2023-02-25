import {User, UserRole} from '../interfaces'
import {randomUUID} from 'crypto'
const bcrypt = require('bcrypt')

export default class UserModel {
    private id?: string
    private name?: string
    private email?: string
    private phone?: string
    private role?: UserRole
    private password?: string
    private createdAt?: string
    private updatedAt?: string

    public get = (): User => {
        return {
            id: this.id,
            name: this.name ?? '',
            email: this.email ?? '',
            phone: this.phone ?? '',
            role: this.role ?? 'user',
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    
    public set = (user: User): User => {
        this.id = user.id ?? randomUUID()
        this.name = user.name
        this.email = user.email
        this.phone = user.phone
        this.role = user.role
        this.password = user.password ? bcrypt.hashSync(user.password, 10) : bcrypt.hashSync('password', 10)
        this.createdAt = user.createdAt ?? new Date().toISOString()
        this.updatedAt = user.updatedAt

        return this.get()
    }
}
