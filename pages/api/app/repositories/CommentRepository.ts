import { paginate } from 'utils'
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

    findOne = async (id: string) => await this.findOneBy('id', id)

    findOneBy = async (key: string, value: string) => {
        let comments: Comment[] = await this.read()
        comments = comments.filter(comment => comment[key as keyof Comment] === value)
        return comments[0]
    }

    findAll = async () => await this.read()

    findAllPaginate = async (page: number = 1, limit: number = 15) => {
        const comments: Comment[] = await this.findAll()
        return paginate(comments as [], page, limit)
    }

    findAllBy = async (key: string, value: string) => {
        let comments: Comment[] = await this.read()
        return comments.filter(comment => comment[key as keyof Comment] === value)
    }

    create = async (comment: Comment) => await this.add(comment).then(async () => await this.read())

    update = async (id: string, newComment: Comment) => {
        let comments: Comment[] = await this.read()

        comments = comments.map(comment => {
            if (comment.id === id) {
                newComment.editedAt = new Date().toISOString()
            }

            return this.commentModel.set({...comment, ...newComment})
        })

        return await this.write({comments: comments}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        let comments: Comment[] = await this.read()
        comments = comments.filter(comment => comment.id !== id)

        return await this.write({comments: comments}).then(async () => await this.read())
    }
}
