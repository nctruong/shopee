import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import app from "../app"

beforeAll(async function() {
    process.env.JWT_KEY = 'willnguyen'

    const mongo = await MongoMemoryServer.create();
    const url = mongo.getUri()

    await mongoose.connect(url)
})

beforeEach(async function() {
    if (!mongoose.connection.db) return

    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async function() {
    await mongoose.connection.close()
})
