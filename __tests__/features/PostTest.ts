import supertest, {Response} from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
// afterAll(() => refreshDatabase())
// beforeEach(() => refreshDatabase())

test('can store post', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })
        .expect(200)
        .then((res: Response) => expect(res.body.status).toBe("success"))
})

test('can update post', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async (res: Response) => {
            await req.patch('/posts/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({
                    "title": "Lorem ipsum dolor sit amet",
                    "content": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident"
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

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .expect(200)
        .then((res: Response) => {
            expect(res.body.length).toEqual(1)
            expect(res.body[0].id).toBeDefined()
            expect(res.body[0].publishedAt).toBeDefined()
            expect(res.body[0].userId).toBe(authRes.body.user.id)
            expect(res.body[0].title).toBe("Corrupti praesentium ratione")
            expect(res.body[0].slug).toBe("corrupti-praesentium-ratione")
            expect(res.body[0].content).toBe("Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.")
        })
})

test('can get post item', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async (res: Response) => {
            await req.get('/posts/' + res.body[0].id)
                .expect(200)
                .then((res: Response) => {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.publishedAt).toBeDefined()
                    expect(res.body.userId).toBe(authRes.body.user.id)
                    expect(res.body.title).toBe("Corrupti praesentium ratione")
                    expect(res.body.slug).toBe("corrupti-praesentium-ratione")
                    expect(res.body.content).toBe("Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.")
                })
        })
})

test('can delete post', async () => {
    const authRes: Response = await req.post('/login')
        .send({
            "email": "john@doe.com",
            "password": "password",
        })

    await req.post('/posts')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "title": "Corrupti praesentium ratione",
            "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
        })

    await req.get('/posts')
        .then(async (res: Response) => {
            await req.delete('/posts/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})
