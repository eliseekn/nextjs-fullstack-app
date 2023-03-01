import supertest from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
//beforeEach(() => refreshDatabase())

test('can store post', async () => {
    const authRes = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })
        .expect(200)
        .then(res => expect(res.body.status).toBe("success"))
})

test('can update post', async () => {
    const authRes = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async res => {
            await req.patch('/posts/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Lorem ipsum dolor sit amet",
                })
                .expect(200)
                .then(res => expect(res.body.status).toBe("success"))
        })
})

test('can get posts collection', async () => {
    const authRes = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .expect(200)
        .then(res => {
            expect(res.body.length).toEqual(1)
            expect(res.body[0].id).toBeDefined()
            expect(res.body[0].publishedAt).toBeDefined()
            expect(res.body[0].userId).toBe("1cb468dd-0f6e-4551-9834-337de6adb6f0")
            expect(res.body[0].title).toBe("Corrupti praesentium ratione")
            expect(res.body[0].slug).toBe("corrupti-praesentium-ratione")
            expect(res.body[0].content).toBe("Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.")
        })
})

test('can get post item', async () => {
    const authRes = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async res => {
            await req.get('/posts/' + res.body[0].id)
                .expect(200)
                .then(res => {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.publishedAt).toBeDefined()
                    expect(res.body.userId).toBe("1cb468dd-0f6e-4551-9834-337de6adb6f0")
                    expect(res.body.title).toBe("Corrupti praesentium ratione")
                    expect(res.body.slug).toBe("corrupti-praesentium-ratione")
                    expect(res.body.content).toBe("Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.")
                })
        })
})

test('can delete post', async () => {
    const authRes = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async res => {
            await req.delete('/posts/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then(res => expect(res.body.status).toBe("success"))
        })
})
