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

    public getCollection = () => {
        this.commentRepository
            .findAll()
            .then(data => this.res.status(200).json(data))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getPostCollection = (postId: string) => {
        this.commentRepository
            .findAllBy('postId', postId)
            .then(data => this.res.status(200).json(data))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getItem = (id: string) => {
        this.commentRepository
            .findOne(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json(data)
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public store = (comment: Comment) => {
        this.commentRepository
            .create(comment)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public update = (id: string, comment: Comment) => {
        this.commentRepository
            .update(id, comment)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public destroy = (id: string) => {
        this.commentRepository
            .destroy(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
