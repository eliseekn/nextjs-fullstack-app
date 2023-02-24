import {NextApiResponse} from "next";
import {Post, User} from "@/pages/api/app/interfaces";
import {PostRepository} from "@/pages/api/app/repositories";

export default class PostController {
    private res: NextApiResponse<Post[] | User[] | {}>
    private postRepository: PostRepository

    constructor(res: NextApiResponse<Post[] | User[] | {}>) {
        this.res = res
        this.postRepository = new PostRepository()
    }

    getCollection = () => {
        this.postRepository
            .findAll()
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to get posts collection'}))
    }

    getItem = (id: string) => {
        this.postRepository
            .find(id)
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to get post item'}))
    }

    store = (post: Post) => {
        this.postRepository
            .create(post)
            .then(() => this.res.status(200).json({status: 'success', message: 'Post created'}))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to create posts'}))
    }

    update = (id: string, post: Post) => {
        this.postRepository
            .update(id, post)
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to update posts'}))
    }

    destroy = (id: string) => {
        this.postRepository
            .destroy(id)
            .then(data => this.res.status(200).json(data))
            .catch(() => this.res.status(500).json({status: 'error', message: 'Failed to delete posts'}))
    }
}
