import request from "supertest";
import app from "../src/app";
import { db } from "../src/utils/db";

beforeAll(async () => {
    const database = await db;
    await database.exec("DELETE FROM users");
});

describe("Auth API Tests", () => {
    const user = {
        username: "testuser",
        password: "testpassword",
    };

    // registering a new user
    it("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send(user);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ message: "User registered successfully" });
    });

    // duplicated users
    it("should not register a user with an existing username", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send(user);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error", "Username already exists");
    });

    // check token
    it("should log in a user and return a JWT", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send(user);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    // invalid credentials login
    it("should not log in with invalid credentials", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "wrongpassword" });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
});
