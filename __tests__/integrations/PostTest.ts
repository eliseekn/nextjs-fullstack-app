import supertest from "supertest"
const fs = require('fs')
const path = require("path")

const req = supertest.agent("http://localhost:3000/api")

const refreshDatabase = () => {
    return fs.writeFileSync(path.join(__dirname, "../../pages/api/app/database", "db.json"), JSON.stringify({
        users: [
            {
                id: "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                name: "John Doe",
                email: "john@doe.com",
                phone: "0000000000",
                password: "$2a$10$QIxJVUKlWLt53Dcw0IdG/.48ihT7HBouTO/fENLvD3vAesOXpMoPq",
                role: "admin",
                createdAt: "2023-02-25T07:45:49.457Z"
            }
        ],
        tokens: [],
        posts: [],
        comments: []
    }))
}

beforeEach(() => refreshDatabase())

it('can store post', async () => {
    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            await req.post('/posts')
                .set({Authorization: 'Bearer ' + res.body.token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Corrupti praesentium ratione",
                    "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
                })
                .expect(200)
                .then(res => expect(res.body.status).toBe("success"))
        })
})

it('can update post', async () => {
    let token: string = ''

    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            token = res.body.token

            await req.post('/posts')
                .set({Authorization: 'Bearer ' + token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Corrupti praesentium ratione",
                    "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
                })
                .then(async () => {
                    await req.get('/posts')
                        .then(async res => {
                            await req.patch('/posts/' + res.body[0].id)
                                .set({Authorization: 'Bearer ' + token})
                                .send({
                                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                                    "title": "Lorem ipsum dolor sit amet",
                                })
                                .expect(200)
                                .then(res => expect(res.body.status).toBe("success"))
                        })
                })
        })
})

it('can get posts collection', async () => {
    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            await req.post('/posts')
                .set({Authorization: 'Bearer ' + res.body.token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Corrupti praesentium ratione",
                    "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
                })
                .then(async () => {
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
        })
})

it('can get post item', async () => {
    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            await req.post('/posts')
                .set({Authorization: 'Bearer ' + res.body.token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Corrupti praesentium ratione",
                    "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
                })
                .then(async () => {
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
        })
})

it('can delete post', async () => {
    let token: string = ''

    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            token = res.body.token

            await req.post('/posts')
                .set({Authorization: 'Bearer ' + token})
                .send({
                    "userId": "1cb468dd-0f6e-4551-9834-337de6adb6f0",
                    "title": "Corrupti praesentium ratione",
                    "content": "Corrupti praesentium ratione assumenda impedit eius est sed voluptas. Laudantium optio ut saepe omnis sit accusamus placeat. Magni impedit molestiae dolores.",
                })
                .then(async () => {
                    await req.get('/posts')
                        .then(async res => {
                            await req.delete('/posts/' + res.body[0].id)
                                .set({Authorization: 'Bearer ' + token})
                                .expect(200)
                                .then(res => expect(res.body.status).toBe("success"))
                        })
                })
        })
})
