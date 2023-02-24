import db from '../database'
import {Post, Repository} from '../interfaces'
import {PostModel} from '../models'

export default class PostRepository implements Repository {
    private postModel: PostModel

    constructor () {
        this.postModel = new PostModel()
    }

    read = async () => {
        await db.read()
        return db.data?.posts
    }

    write = async (post: Post) => {
        await db.read()
        post = this.postModel.set(post)
        db.data?.posts?.push(post)
    }

    public find = async (id: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id === id)
        return posts[0]
    }

    public findAll = async () => await this.read()

    public create = async (post: Post) => {
        await this.write(post)
        return await db.write().then(async () => await this.read())
    }

    public update = async (id: string, newPost: Post) => {
        let posts: Post[] = await this.read()

        posts = posts.map(post => {
            if (post.id === id) {
                newPost.id = id
                newPost.editedAt = new Date().toISOString()
            }

            return this.postModel.set(newPost)
        })

        db.data = {posts: posts}
        return db.write().then(async () => await this.read())
    }

    public destroy = async (id: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id !== id)

        if (posts.length === 0) {
            return posts
        }

        db.data = {posts: posts}
        return db.write().then(async () => await this.read())
    }
}
