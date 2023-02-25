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
        return db.data?.posts ?? []
    }

    write = async (data: {}) => {
        db.data = data
        return await db.write()
    }

    add = async (post: Post) => {
        let posts = await this.read()
        posts.push(this.postModel.set(post))

        return await this.write({posts: posts})
    }

    public find = async (id: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id === id)
        return posts[0]
    }

    public findAll = async () => await this.read()

    public create = async (post: Post) => await this.add(post).then(async () => await this.read())

    public update = async (id: string, newPost: Post) => {
        let posts: Post[] = await this.read()

        posts = posts.map(post => {
            if (post.id === id) {
                newPost.id = id
                newPost.editedAt = new Date().toISOString()
            }

            return this.postModel.set(newPost)
        })

        return await this.write({posts: posts}).then(async () => await this.read())
    }

    public destroy = async (id: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id !== id)

        return await this.write({posts: posts}).then(async () => await this.read())
    }
}
