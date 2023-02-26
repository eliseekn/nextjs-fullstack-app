import {NextApiResponse} from "next"
import {Comment} from "@/pages/api/app/interfaces"
import {CommentRepository} from "@/pages/api/app/repositories"

export default class CommentController {
    private res: NextApiResponse
    private commentRepository: CommentRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.commentRepository = new CommentRepository()
    }

    public getCollection = async () => {
        return await this.commentRepository
            .findAll()
            .then((comments: Comment[]) => this.res.status(200).json(comments))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getPostCollection = async (postId: string) => {
        return await this.commentRepository
            .findAllBy('postId', postId)
            .then((comments: Comment[]) => this.res.status(200).json(comments))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getItem = async (id: string) => {
        return await this.commentRepository
            .findOne(id)
            .then((comment: Comment) => {
                if (!comment) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json(comment)
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public store = async (comment: Comment) => {
        return await this.commentRepository
            .create(comment)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public update = async (id: string, comment: Comment) => {
        return await this.commentRepository
            .update(id, comment)
            .then((comments: Comment[]) => {
                if (!comments) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public destroy = async (id: string) => {
        return await this.commentRepository
            .destroy(id)
            .then((comments: Comment[]) => {
                if (!comments) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
