export type Post = {
    id?: string,
    title: string,
    slug: string,
    content: string,
    publishedAt: string,
    editedAt?: string
}

export type User = {
    id?: string,
    name: string,
    email: string,
    phone: string,
    role: Roles<string>,
    createdAt: string,
    updatedAt?: string
}

export type Tables = {
    posts?: Post[],
    users?: User[]
}

type Roles<T> = ['admin', 'user']