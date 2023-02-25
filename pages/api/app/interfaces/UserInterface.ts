export type UserRole = 'admin' | 'user'

export type User = {
    id?: string,
    name: string,
    email: string,
    phone: string,
    password?: string,
    role: UserRole,
    createdAt?: string,
    updatedAt?: string
}
