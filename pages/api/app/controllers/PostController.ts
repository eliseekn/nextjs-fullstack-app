import {NextApiRequest, NextApiResponse} from "next"
import {Post, User} from "@/pages/api/app/interfaces"
import {PostRepository} from "@/pages/api/app/repositories"
import {Auth} from "@/pages/api/app/services"

export default class PostController {
    private readonly req: NextApiRequest
    private res: NextApiResponse
    private postRepository: PostRepository

    constructor(req: NextApiRequest, res: NextApiResponse) {
        this.req = req
        this.res = res
        this.postRepository = new PostRepository()
    }

    public getCollection = async (page?: number, limit?: number) => {
        if (!page || !limit) {
            return await this.postRepository
                .findAll()
                .then((posts: Post[]) => this.res.status(200).json(posts))
                .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
        }

        await this.postRepository
            .findAllPaginate(page, limit)
            .then(posts => this.res.status(200).json(posts))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public getItem = async (id: string) => {
        await this.postRepository
            .findOne(id)
            .then((post: Post) => {
                if (!post) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json(post)
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public store = async (post: Post) => {
        const user = await Auth(this.req) as User
        post.userId = user.id ?? ''

        await this.postRepository
            .create(post)
            .then(() => this.res.status(200).json({status: 'success'}))
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public update = async (id: string, post: Post) => {
        await this.postRepository
            .update(id, post)
            .then((posts: Post[]) => {
                if (!posts) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }

    public destroy = async (id: string) => {
        await this.postRepository
            .destroy(id)
            .then((posts: Post[]) => {
                if (!posts) {
                    this.res.status(404).json({status: 'error'})
                }

                this.res.status(200).json({status: 'success'})
            })
            .catch(e => this.res.status(500).json({status: 'error', message: e.message}))
    }
}
