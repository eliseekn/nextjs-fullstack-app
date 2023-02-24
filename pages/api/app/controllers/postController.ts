import {NextApiResponse} from "next"
import {Post, User} from "@/pages/api/app/interfaces"
import {PostRepository} from "@/pages/api/app/repositories"

export default class PostController {
    private res: NextApiResponse<Post[] | User[] | {}>
    private postRepository: PostRepository

    constructor(res: NextApiResponse<Post[] | User[] | {}>) {
        this.res = res
        this.postRepository = new PostRepository()
    }

    public getCollection = () => {
        this.postRepository
            .findAll()
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to get posts collection'}))
    }

    public getItem = (id: string) => {
        this.postRepository
            .find(id)
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to get post item'}))
    }

    public store = (post: Post) => {
        this.postRepository
            .create(post)
            .then(() => this.res.status(200).json({status: 'success', message: 'Post created successfully'}))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to create post'}))
    }

    public update = (id: string, post: Post) => {
        this.postRepository
            .update(id, post)
            .then(() => this.res.status(200).json({status: 'success', message: 'Post updated successfully'}))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to update post'}))
    }

    public destroy = (id: string) => {
        this.postRepository
            .destroy(id)
            .then(() => this.res.status(200).json({status: 'success', message: 'Post deleted successfully'}))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to delete post'}))
    }
}
