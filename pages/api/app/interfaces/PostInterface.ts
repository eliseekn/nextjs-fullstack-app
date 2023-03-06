export type Post = {
    id?: string,
    userId: string,
    title: string,
    slug?: string,
    content: string,
    publishedAt?: string,
    editedAt?: string
}

export type PaginatePost = {
    page: number,
    totalPages: number,
    items: Post[]
}
