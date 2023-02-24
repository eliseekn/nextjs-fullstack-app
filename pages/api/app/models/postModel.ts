import {Post} from '../interfaces'
import {randomUUID} from 'crypto'
import {slugify} from "@/pages/api/app/helpers";

export default class PostModel {
    private id?: string
    private title?: string
    private slug?: string
    private content?: string
    private publishedAt?: string
    private editedAt?: string

    public get = (): Post => {
        return {
            id: this.id,
            title: this.title ?? '',
            slug: this.slug,
            content: this.content ?? '',
            publishedAt: this.publishedAt,
            editedAt: this.editedAt
        }
    }
    
    public set = (post: Post): Post => {
        this.id = post.id ?? randomUUID()
        this.title = post.title
        this.slug = slugify(post.title)
        this.content = post.content
        this.publishedAt = post.publishedAt ?? new Date().toISOString()
        this.editedAt = post.editedAt

        return this.get()
    }
}
