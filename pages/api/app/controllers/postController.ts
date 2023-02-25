import {NextApiResponse} from "next"
import {Post} from "@/pages/api/app/interfaces"
import {PostRepository} from "@/pages/api/app/repositories"

export default class PostController {
    private res: NextApiResponse
    private postRepository: PostRepository

    constructor(res: NextApiResponse) {
        this.res = res
        this.postRepository = new PostRepository()
    }

    public getCollection = () => {
        this.postRepository
            .findAll()
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public getItem = (id: string) => {
        this.postRepository
            .find(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json(data)
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public store = (post: Post) => {
        this.postRepository
            .create(post)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public update = (id: string, post: Post) => {
        this.postRepository
            .update(id, post)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }

    public destroy = (id: string) => {
        this.postRepository
            .destroy(id)
            .then(data => {
                if (!data) {
                    return this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(() => this.res.status(500).json({status: 'error'}))
    }
}
