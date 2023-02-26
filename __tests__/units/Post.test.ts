import {describe} from "@jest/globals"
import {Post} from "@/pages/api/app/interfaces"
import PostModel from "../../pages/api/app/models/PostModel"

describe('Post tests', () => {
    test('can initialize Post', () => {
        let post: Post = {
            userId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            title: "Lorem ipsum dolor sit amet",
            content: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores."
        }

        expect(post).toBeInstanceOf(Object)
    })
})

describe('PostModel tests', () => {
    test('can set Post properties', () => {
        let post: Post = {
            userId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            title: "Lorem ipsum dolor sit amet",
            content: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores."
        }

        const postModel: PostModel = new PostModel()
        post = postModel.set(post)

        expect(postModel).toBeInstanceOf(PostModel)
        expect(post).toBeInstanceOf(Object)
        expect(post.id).toBeDefined()
        expect(post.userId).toBeDefined()
        expect(post.title).toBeDefined()
        expect(post.content).toBeDefined()
        expect(post.publishedAt).toBeDefined()
    })

    test('can get Post properties', () => {
        let post: Post = {
            userId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            title: "Lorem ipsum dolor sit amet",
            content: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores."
        }

        const postModel: PostModel = new PostModel()
        postModel.set(post)
        post = postModel.get()

        expect(postModel).toBeInstanceOf(PostModel)
        expect(post).toBeInstanceOf(Object)
        expect(post.userId).toBe("1cb468dd-0f6e-4551-9834-337de6adb6f0")
        expect(post.title).toBe("Lorem ipsum dolor sit amet")
        expect(post.content).toBe("Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.")
        expect(post.publishedAt).toBeDefined()
        expect(post.id).toBeDefined()
    })
})
