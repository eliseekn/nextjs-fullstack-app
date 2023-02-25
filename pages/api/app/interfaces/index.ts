export type Post = {
    id?: string,
    title: string,
    slug?: string,
    content: string,
    publishedAt?: string,
    editedAt?: string
}

export type UserRole = 'admin' | 'user'

export type User = {
    id?: string,
    name: string,
    email: string,
    phone: string,
    role: UserRole,
    createdAt?: string,
    updatedAt?: string
}

export type Tables = {
    posts?: Post[],
    users?: User[]
}

export interface Repository  {
    read: () => void,
    write: (data: any) => void
    add: (data: any) => void
}
