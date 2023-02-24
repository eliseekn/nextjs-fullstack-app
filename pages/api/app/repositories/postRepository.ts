import db from '../database'
import { Post } from '../interfaces'
import * as crypto from "crypto"

export default class PostRepository {
    find = async (id: string) => {
        return await db.read().then(() => {
            let posts: Post[] = db.data?.posts
            posts = posts.filter(post => post.id === id)
            return posts[0]
        })
    }

    findAll = async () => {
        return await db.read().then(() => db.data?.posts)
    }

    create = async (post: Post) => {
        post.id = crypto.randomUUID()
        post.publishedAt =  new Date().toISOString()

        db.data?.posts?.push(post)
        return await db.write().then(() => db.data?.posts)
    }

    update = async (id: string, post: Post) => {
        return await db.read().then(() => {
            let posts: Post[] = db.data?.posts
            posts = posts.filter(post => post.id === id)
            posts[0] = post

            db.data = {posts: posts}
            return db.write().then(() => db.data?.posts)
        })
    }

    destroy = async (id: string) => {
        return await db.read().then(() => {
            let posts: Post[] = db.data?.posts
            posts = posts.filter(_post => _post.id !== id)

            db.data = {posts: posts}
            return db.write().then(() => db.data?.posts)
        })
    }
}
