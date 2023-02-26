import {describe} from "@jest/globals"
import {User} from "@/pages/api/app/interfaces"
import UserModel from "../../pages/api/app/models/UserModel"

describe('User tests', () => {
    test('can initialize User', () => {
        let user: User = {
            name: "John Doe",
            email: "john@doe.com",
            phone: "0000000000",
            role: "admin",
        }

        expect(user).toBeInstanceOf(Object)
    })
})

describe('UserModel tests', () => {
    test('can set User properties', () => {
        let user: User = {
            name: "John Doe",
            email: "john@doe.com",
            phone: "0000000000",
            role: "admin",
        }

        const userModel: UserModel = new UserModel()
        user = userModel.set(user)

        expect(userModel).toBeInstanceOf(UserModel)
        expect(user).toBeInstanceOf(Object)
        expect(user.id).toBeDefined()
        expect(user.name).toBeDefined()
        expect(user.email).toBeDefined()
        expect(user.phone).toBeDefined()
        expect(user.role).toBeDefined()
        expect(user.createdAt).toBeDefined()
        expect(user.password).toBeDefined()
    })

    test('can get User properties', () => {
        let user: User = {
            name: "John Doe",
            email: "john@doe.com",
            phone: "0000000000",
            role: "admin",
        }

        const userModel: UserModel = new UserModel()
        userModel.set(user)
        user = userModel.get()

        expect(userModel).toBeInstanceOf(UserModel)
        expect(user).toBeInstanceOf(Object)
        expect(user.name).toBe("John Doe")
        expect(user.email).toBe("john@doe.com")
        expect(user.phone).toBe("0000000000")
        expect(user.role).toBe("admin")
        expect(user.createdAt).toBeDefined()
        expect(user.id).toBeDefined()
        expect(user.password).toBeDefined()
    })
})
