import db from '../database'
import { Post } from '../interfaces'

export default class PostRepository {
    find = async (id: string) => await db.read()

    findAll = async (req: NextApiRequest, res: NextApiResponse<any>) => {
        const data = await db.read()

    }

    store = async (post: Post) => {
        db.data = {posts: [post]}
        return await db.write()
    }
}
