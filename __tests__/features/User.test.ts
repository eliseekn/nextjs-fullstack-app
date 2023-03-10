import supertest, {Response} from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
afterAll(() => refreshDatabase())
beforeEach(() => refreshDatabase())

test('can store user', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "name": "Jeanne Doe",
            "email": "jeanne@doe.com",
            "phone": "0000000001"
        })
        .expect(200)
        .then((res: Response) => expect(res.body.status).toBe("success"))
})

test('can update user', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "name": "Jeanne Doe",
            "email": "jeanne@doe.com",
            "phone": "0000000001"
        })

    await req.get('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.put('/users/' + res.body[1].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({
                    "name": "Sarah Doe",
                    "email": "sarah@doe.com",
                })
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})

test('can get posts collection', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "name": "Jeanne Doe",
            "email": "jeanne@doe.com",
            "phone": "0000000001"
        })

    await req.get('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .expect(200)
        .then((res: Response) => {
            expect(res.body.length).toEqual(2)
            expect(res.body[1].id).toBeDefined()
            expect(res.body[1].createdAt).toBeDefined()
            expect(res.body[1].name).toBe("Jeanne Doe")
            expect(res.body[1].email).toBe("jeanne@doe.com")
            expect(res.body[1].phone).toBe("0000000001")
        })
})

test('can get post item', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "name": "Jeanne Doe",
            "email": "jeanne@doe.com",
            "phone": "0000000001"
        })

    await req.get('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.get('/users/' + res.body[1].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then((res: Response) => {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.createdAt).toBeDefined()
                    expect(res.body.name).toBe("Jeanne Doe")
                    expect(res.body.email).toBe("jeanne@doe.com")
                    expect(res.body.phone).toBe("0000000001")
                })
        })
})

test('can delete user', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "name": "Jeanne Doe",
            "email": "jeanne@doe.com",
            "phone": "0000000001"
        })

    await req.get('/users')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.delete('/users/' + res.body[1].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})
