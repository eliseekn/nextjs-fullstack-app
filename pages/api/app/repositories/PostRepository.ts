import db from '../database'
import { paginate, slugify, base64ToFile } from 'utils'
import {Post, Repository} from '../interfaces'
import {PostModel} from '../models'
import fs from "fs"
import path from "path"

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

    findAllPaginate = async (page: number = 1, limit: number = 15) => {
        const posts: Post[] = await this.findAll()
        return paginate(posts as [], page, limit)
    }

    findAllBy = async (key: string, value: string) => {
        let posts: Post[] = await this.read()
        return posts.filter(post => post[key as keyof Post] === value)
    }

    create = async (post: Post) => {
        const fileName: string = slugify(post.title)
        base64ToFile(post.image, fileName)
        post.image = fileName

        return await this.add(post).then(async () => await this.read())
    }

    update = async (id: string, newPost: Post) => {
        let posts: Post[] = await this.read()

        posts = posts.map(post => {
            if (post.id === id) {
                const fileName: string = slugify(newPost.title)

                if (newPost.image !== "") {
                    fs.unlinkSync(path.relative(process.cwd(), `public/upload/${post.image}`))
                    base64ToFile(newPost.image, fileName)
                } else {
                    fs.rename(
                        path.relative(process.cwd(), `public/upload/${post.image}`),
                        path.relative(process.cwd(), `public/upload/${fileName}`),
                            err => console.log(err)
                    )
                }

                newPost.image = fileName
                newPost.editedAt = new Date().toISOString()

                return this.postModel.set({...post, ...newPost})
            }

            return post
        })

        return await this.write({posts: posts}).then(async () => await this.read())
    }

    destroy = async (id: string) => {
        const post: Post = await this.findOne(id)
        fs.unlinkSync(path.relative(process.cwd(), `public/upload/${post.image}`))

        let posts: Post[] = await this.read()
        posts = posts.filter(post => post.id !== id)

        return await this.write({posts: posts}).then(async () => await this.read())
    }
}
