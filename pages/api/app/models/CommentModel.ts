import {Comment} from '../interfaces'
import {randomUUID} from 'crypto'

export default class CommentModel {
    private id?: string
    private postId?: string
    private userId?: string
    private message?: string
    private publishedAt?: string
    private editedAt?: string

    public get = (): Comment => {
        return {
            id: this.id,
            postId: this.postId ?? '',
            userId: this.userId ?? '',
            message: this.message ?? '',
            publishedAt: this.publishedAt,
            editedAt: this.editedAt
        }
    }
    
    public set = (comment: Comment): Comment => {
        this.id = comment.id ?? randomUUID()
        this.postId = comment.postId
        this.userId = comment.userId
        this.message = comment.message
        this.publishedAt = comment.publishedAt ?? new Date().toISOString()
        this.editedAt = comment.editedAt

        return this.get()
    }
}
