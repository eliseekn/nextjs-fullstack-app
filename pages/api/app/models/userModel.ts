import {User} from '../interfaces'
import {randomUUID} from 'crypto'

export default class UserModel {
    private id?: string
    private name?: string
    private email?: string
    private phone?: string
    private role?: string
    private createdAt?: string
    private updatedAt?: string

    public get = (): User => {
        return {
            id: this.id,
            name: this.name ?? '',
            email: this.email ?? '',
            phone: this.phone ?? '',
            role: this.role ?? '',
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
    
    public set = (user: User): User => {
        this.id = user.id ?? randomUUID()
        this.name = user.name
        this.email = user.email
        this.phone = user.phone
        this.createdAt = user.createdAt ?? new Date().toISOString()
        this.updatedAt = user.updatedAt

        return this.get()
    }
}
