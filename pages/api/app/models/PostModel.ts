import {Post} from '../interfaces'
import {randomUUID} from 'crypto'
import {slugify} from "../helpers"

export default class PostModel {
    private id?: string
    private userId?: string
    private title?: string
    private slug?: string
    private content?: string
    private image?: string
    private publishedAt?: string
    private editedAt?: string

    public get = (): Post => {
        return {
            id: this.id,
            userId: this.userId ?? '',
            title: this.title ?? '',
            slug: this.slug,
            content: this.content ?? '',
            image: this.image ?? '',
            publishedAt: this.publishedAt,
            editedAt: this.editedAt
        }
    }
    
    public set = (post: Post): Post => {
        this.id = post.id ?? randomUUID()
        this.userId = post.userId
        this.title = post.title
        this.slug = slugify(post.title)
        this.content = post.content
        this.image = post.image
        this.publishedAt = post.publishedAt ?? new Date().toISOString()
        this.editedAt = post.editedAt

        return this.get()
    }
}
