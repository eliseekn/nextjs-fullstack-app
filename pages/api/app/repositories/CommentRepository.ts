import db from '../database'
import {Comment, Repository} from '../interfaces'
import {CommentModel} from '../models'

export default class CommentRepository implements Repository {
    private commentModel: CommentModel

    constructor () {
        this.commentModel = new CommentModel()
    }

    read = async () => {
        await db.read()
        return db.data?.comments ?? []
    }

    write = async (data: {comments: Comment[]}) => {
        Object.assign(db.data as Object, {comments: data.comments})
        return await db.write()
    }

    add = async (comment: Comment) => {
        let comments = await this.read()
        comments.push(this.commentModel.set(comment))

        return await this.write({comments: comments})
    }

    find = async (id: string) => {
        let comments: Comment[] = await this.read()
        comments = comments.filter(comment => comment.id === id)
        return comments[0]
    }

    findBy = async (key: string, value: string) => {
        let comments: Comment[] = await this.read()
        comments = comments.filter(comment => comment[key as keyof Comment] === value)
        return comments[0]
    }

    findAll = async () => await this.read()

    create = async (comment: Comment) => await this.add(comment).then(async () => await this.read())

    update = async (id: string, newComment: Comment) => {
        let comments: Comment[] = await this.read()

        comments = comments.map(comment => {
            if (comment.id === id) {
                newComment.id = id
                newComment.editedAt = new Date().toISOString()
            }

            return this.commentModel.set(newComment)
        })

        return await this.write({comments: comments}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        let comments: Comment[] = await this.read()
        comments = comments.filter(comment => comment.id !== id)

        return await this.write({comments: comments}).then(async () => await this.read())
    }
}
