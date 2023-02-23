// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Post } from './interfaces'
import { PostRepository } from './repositories'

const postRepository = new PostRepository()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // const posts: Post = {
    //     title: 'Lorem ipsum dolor sit amet',
    //     slug: 'lorem-ipsum-dolor-sit-amet',
    //     content: 'Aspernatur fugit omnis iusto laborum. Aut magnam voluptatem et ea ipsa labore nobis. Mollitia aliquam dolor cum nesciunt. Sit soluta tenetur architecto non cum amet consectetur illum. Iusto aliquam incidunt cum quasi ullam dolorum officia ut. ',
    //     publishedAt: new Date().toISOString(),
    // }

    postRepository.store({
        title: 'Lorem ipsum dolor sit amet',
        slug: 'lorem-ipsum-dolor-sit-amet',
        content: 'Aspernatur fugit omnis iusto laborum. Aut magnam voluptatem et ea ipsa labore nobis. Mollitia aliquam dolor cum nesciunt. Sit soluta tenetur architecto non cum amet consectetur illum. Iusto aliquam incidunt cum quasi ullam dolorum officia ut. ',
        publishedAt: new Date().toISOString(),
    })

    const posts: Post[] = postRepository.findAll()

    res.status(200).json(posts)
}
