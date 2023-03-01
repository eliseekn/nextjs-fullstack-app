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

    write = async (data: {posts: Post[]}) => {
        Object.assign(db.data as Object, {posts: data.posts})
        return await db.write()
    }

    add = async (post: Post) => {
        let posts = await this.read()
        posts.push(this.postModel.set(post))

        return await this.write({posts: posts})
    }

    findOne = async (id: string) => await this.findOneBy('id', id)

    findOneBy = async (key: string, value: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post[key as keyof Post] === value)
        return posts[0]
    }

    findAll = async () => await this.read()

    findAllBy = async (key: string, value: string) => {
        let posts: Post[] = await this.read()
        return posts.filter(post => post[key as keyof Post] === value)
    }

    create = async (post: Post) => await this.add(post).then(async () => await this.read())

    update = async (id: string, newPost: Post) => {
        let posts: Post[] = await this.read()

        posts = posts.map(post => {
            if (post.id === id) {
                post.editedAt = new Date().toISOString()
                return this.postModel.set({...post, ...newPost})
            }

            return post
        })

        return await this.write({posts: posts}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id !== id)

        return await this.write({posts: posts}).then(async () => await this.read())
    }
}