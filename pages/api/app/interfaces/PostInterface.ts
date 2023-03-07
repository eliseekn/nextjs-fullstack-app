export type Post = {
    id?: string,
    userId: string,
    title: string,
    slug?: string,
    content: string,
    image: string,
    publishedAt?: string,
    editedAt?: string
}
