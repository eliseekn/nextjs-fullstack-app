import supertest from "supertest"

const req = supertest.agent("http://localhost:3000/api")

it('can get login', () => {
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

it('can get logout', async () => {
    await req.post('/login')
        .send({
            email: "john@doe.com",
            password: "password",
        })
        .then(async res => {
            await req.post('/logout/' + res.body.user.id)
                .set({Authorization: 'Bearer ' + res.body.token})
                .expect(200)
        })
})
