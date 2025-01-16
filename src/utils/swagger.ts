import { OpenAPIV3 } from "openapi-types";

export const swagger: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "User Management API",
        version: "1.0.0",
        description: "API documentation for the User Management System API",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        "/api/auth/register": {
            post: {
                summary: "Register a new user",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        example: "testuser",
                                    },
                                    password: {
                                        type: "string",
                                        example: "testpassword",
                                    },
                                },
                                required: ["username", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User registered successfully",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/api/auth/login": {
            post: {
                summary: "Log in a user",
                tags: ["Auth"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        example: "testuser",
                                    },
                                    password: {
                                        type: "string",
                                        example: "testpassword",
                                    },
                                },
                                required: ["username", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Login successful, returns a JWT",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Invalid credentials",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
        "/api/users/profile": {
            get: {
                summary: "Get the authenticated user's profile",
                tags: ["Users"],
                responses: {
                    "200": {
                        description: "Successfully retrieved user profile",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "integer",
                                            example: 1,
                                        },
                                        username: {
                                            type: "string",
                                            example: "testuser",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized, token is missing or invalid",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
            put: {
                summary: "Update the authenticated user's profile",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: {
                                        type: "string",
                                        example: "updateduser",
                                    },
                                },
                                required: ["username"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Profile updated successfully",
                    },
                    "401": {
                        description: "Unauthorized, token is missing or invalid",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
            delete: {
                summary: "Delete the authenticated user's profile",
                tags: ["Users"],
                responses: {
                    "200": {
                        description: "Profile deleted successfully",
                    },
                    "401": {
                        description: "Unauthorized, token is missing or invalid",
                    },
                    "500": {
                        description: "Internal server error",
                    },
                },
            },
        },
    },
};
