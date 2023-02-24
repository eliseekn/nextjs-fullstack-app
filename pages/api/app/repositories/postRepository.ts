import db from '../database'
import {Post, Repository} from '../interfaces'
import {PostModel} from '../models'

export default class PostRepository implements Repository {
    private postModel: PostModel

    constructor () {
        this.postModel = new PostModel()
    }

    read = (): Post[] => {
        db.read()
        return db.data?.posts
    }

    write = (post: Post) => {
        db.read()
        post = this.postModel.set(post)
        db.data?.posts?.push(post)
    }

    public find = async (id: string) => {
        return await db.read().then(() => {
            const posts: Post[] = this.read().filter(post => post.id === id)
            return posts[0]
        })
    }

    findAll = async () => await db.read().then(() => this.read())

    create = async (post: Post) => {
        this.write(post)
        return await db.write().then(() => this.read())
    }

    public update = async (id: string, post: Post) => {
        return await db.read().then(async () => {
            let posts: Post[] = this.read().filter(post => post.id === id)
            posts[0] = post
            db.data = {posts: posts}

            return db.write().then(() => this.read())
        })
    }

    public destroy = async (id: string) => {
        return await db.read().then(async () => {
            let posts: Post[] = this.read().filter(post => post.id !== id)
            db.data = {posts: posts}

            return db.write().then(() => this.read())
        })
    }
}
