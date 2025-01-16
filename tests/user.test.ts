import request from "supertest";
import app from "../src/app";
import { db } from "../src/utils/db";

let token: string;

beforeAll(async () => {
    const database = await db;
    await database.exec("DELETE FROM users");

    await request(app).post("/api/auth/register").send({
        username: "testuser",
        password: "testpassword",
    });

    const loginResponse = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "testpassword",
    });
    token = loginResponse.body.token;
});

describe("User API Tests", () => {
    // fetch profile data
    it("should retrieve the authenticated user's profile", async () => {
        const response = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("username", "testuser");
    });

    // update profile
    it("should update the authenticated user's profile", async () => {
        const response = await request(app)
            .put("/api/users/profile")
            .set("Authorization", `Bearer ${token}`)
            .send({ username: "updateduser" });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Profile updated successfully" });
    });

    // delete profile
    it("should delete the authenticated user's profile", async () => {
        const response = await request(app)
            .delete("/api/users/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Profile deleted successfully" });
    });

    // fetching deleted profile
    it("should not retrieve profile after deletion", async () => {
        const response = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "User not found");
    });
});
