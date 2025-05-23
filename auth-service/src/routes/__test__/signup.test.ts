import request from "supertest";
import app from "../../app"

it('returns a 201 on successful signup', async function() {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "123456",
            role: "member",
            username: "test@test.com",
        })
        .expect(201)
})

it('returns 400 with invalid email', async function() {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testtest.com",
            password: "123456",
            role: "member",
            username: "test@test.com",
        })
        .expect(400)
})

it('returns 400 with invalid password', async function() {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1",
            role: "member",
            username: "test@test.com",
        })
        .expect(400)
})

it('returns 400 with invalid role', async function() {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testtest.com",
            password: "1",
            role: "admin",
            username: "test@test.com",
        })
        .expect(400)
})

it('returns 400 with no username provided', async function() {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "testtest.com",
            password: "1",
            role: "member",
        })
        .expect(400)
})

it('returns 400 with both invalid email and password', async function() {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testtest.com",
            password: "11234564",
            role: "member",
            username: "test@test.com",
        })
        .expect(400)

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1",
            role: "member",
            username: "test@test.com",
        })
        .expect(400)
})

it('returns 400 with user existed', async function() {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "123456",
            role: "member",
            username: "test@test.com",
        })
        .expect(201)

    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "123453we4",
            role: "member",
            username: "test@test.com",
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123453we4",
            role: "member",
            username: "test@test.com",
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
