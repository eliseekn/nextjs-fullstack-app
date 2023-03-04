import supertest, {Response} from "supertest"
import {refreshDatabase} from "../concerns"

const req = supertest.agent("http://localhost:3000/api")
afterAll(() => refreshDatabase())
beforeEach(() => refreshDatabase())

test('can store comment', async () => {
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
            await req.post('/comments')
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({
                    "userId": authRes.body.user.id,
                    "postId": res.body[0].id,
                    "message": "Ultrices tincidunt arcu non sodales neque sodales",
                })
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})

test('can update comment', async () => {
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

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "postId": postRes.body[0].id,
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.patch('/comments/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .send({"message": "Lorem ipsum dolor sit amet"})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})

test('can get comments collection', async () => {
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

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "postId": postRes.body[0].id,
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .expect(200)
        .then((res: Response) => {
            expect(res.body.length).toEqual(1)
            expect(res.body[0].id).toBeDefined()
            expect(res.body[0].publishedAt).toBeDefined()
            expect(res.body[0].userId).toBe(authRes.body.user.id)
            expect(res.body[0].postId).toBe(postRes.body[0].id)
            expect(res.body[0].message).toBe("Ultrices tincidunt arcu non sodales neque sodales")
        })
})

test('can get comment item', async () => {
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

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "postId": postRes.body[0].id,
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.get('/comments/' + res.body[0].id)
                .expect(200)
                .then((res: Response) => {
                    expect(res.body.id).toBeDefined()
                    expect(res.body.publishedAt).toBeDefined()
                    expect(res.body.userId).toBe(authRes.body.user.id)
                    expect(res.body.postId).toBe(postRes.body[0].id)
                    expect(res.body.message).toBe("Ultrices tincidunt arcu non sodales neque sodales")
                })
        })
})

test('can delete comment', async () => {
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

    const postRes: Response = await req.get('/posts')

    await req.post('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .send({
            "userId": authRes.body.user.id,
            "postId": postRes.body[0].id,
            "message": "Ultrices tincidunt arcu non sodales neque sodales",
        })

    await req.get('/comments')
        .set({Authorization: 'Bearer ' + authRes.body.token})
        .then(async (res: Response) => {
            await req.delete('/comments/' + res.body[0].id)
                .set({Authorization: 'Bearer ' + authRes.body.token})
                .expect(200)
                .then((res: Response) => expect(res.body.status).toBe("success"))
        })
})
