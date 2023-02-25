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

export type Post = {
    id?: string,
    userId: string,
    title: string,
    slug?: string,
    content: string,
    publishedAt?: string,
    editedAt?: string
}

export type Token = {
    userId: string,
    value?: string
}

export type Tables = {
    posts?: Post[],
    users?: User[],
    tokens?: Token[]
}

export interface Repository  {
    read(): Promise<any>
    write(data: any): Promise<void>
    add(data: any): Promise<void>
    find(id: any): Promise<any>
    findBy(key: any, value: any): Promise<any>
    findAll(): Promise<any>
    create(data: any): Promise<any>
    update(id: any, data: any): Promise<any>
    destroy(id: any): Promise<any>
}
