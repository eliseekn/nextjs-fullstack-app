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

    public getCollection = async () => {
        return await this.postRepository
            .findAll()
            .then((posts: Post[]) => this.res.status(200).json(posts))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getItem = async (id: string) => {
        return await this.postRepository
            .findOne(id)
            .then((post: Post) => {
                if (!post) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json(post)
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public store = async (post: Post) => {
        return await this.postRepository
            .create(post)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public update = async (id: string, post: Post) => {
        return await this.postRepository
            .update(id, post)
            .then((posts: Post[]) => {
                if (!posts) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public destroy = async (id: string) => {
        return await this.postRepository
            .destroy(id)
            .then((posts: Post[]) => {
                if (!posts) {
                    return this.res.status(404).json({status: 'error'})
                }

                return this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
