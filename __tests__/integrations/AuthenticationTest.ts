import supertest from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
afterEach(() => refreshDatabase())

test('can log in', () => {
    req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })
        .expect(200)
        .then(res => {
            expect(res.body.token).toBeDefined()
            expect(res.body.user).toBeDefined()
            expect(res.body.user).toBeInstanceOf(Object)
            expect(res.body.user.email).toBe("john@doe.com")
        })
})

test('can log out', async () => {
    const authRes = await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })

    await req.post('/logout/' + authRes.body.user.id)
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .expect(200)
})
