import {describe} from "@jest/globals"
import {Comment} from "@/pages/api/app/interfaces"
import CommentModel from "../../pages/api/app/models/CommentModel"

describe('Comment tests', () => {
    test('can initialize Comment', () => {
        let comment: Comment = {
            postId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            email: "john@doe.com",
            message: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores"
        }

        expect(comment).toBeInstanceOf(Object)
    })
})

describe('CommentModel tests', () => {
    test('can set Comment properties', () => {
        let comment: Comment = {
            postId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            email: "john@doe.com",
            message: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores"
        }

        const commentModel: CommentModel = new CommentModel()
        comment = commentModel.set(comment)

        expect(commentModel).toBeInstanceOf(CommentModel)
        expect(comment).toBeInstanceOf(Object)
        expect(comment.id).toBeDefined()
        expect(comment.postId).toBeDefined()
        expect(comment.email).toBeDefined()
        expect(comment.message).toBeDefined()
        expect(comment.publishedAt).toBeDefined()
    })

    test('can get Comment properties', () => {
        let comment: Comment = {
            postId: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            email: "john@doe.com",
            message: "Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores"
        }

        const commentModel: CommentModel = new CommentModel()
        commentModel.set(comment)
        comment = commentModel.get()

        expect(commentModel).toBeInstanceOf(CommentModel)
        expect(comment).toBeInstanceOf(Object)
        expect(comment.postId).toBe("1cb468dd-0f6e-4551-9834-337de6adb6f0")
        expect(comment.email).toBe("john@doe.com")
        expect(comment.message).toBe("Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores")
        expect(comment.publishedAt).toBeDefined()
        expect(comment.id).toBeDefined()
    })
})
