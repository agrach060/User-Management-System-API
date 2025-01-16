# User Management System API

This project is a **User Management System API** built with **TypeScript**, **Express.js**, and **SQLite**. The API allows users to register, log in, and manage their profiles with JWT-based authentication.

---

## Features
- **User Authentication**: Register and log in with secure password hashing and JWT-based authentication.
- **User Profile Management**: Retrieve, update, and delete authenticated user profiles.
- **Error Handling**: Centralized error handling for consistency.

---

## Setup Instructions

### 1. Clone the Repository
Run the following command in the terminal to create a local copy of this repository
```bash
git clone https://github.com/your-username/User-Management-System-API.git
```
Navigate to the project directory:
```bash
cd User-Management-System-API
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following environment variables:
```bash
PORT=3000
JWT_SECRET=create-your-secure-jwt-secret
```
## How to run the application
### Start the Development Server
```bash
npx ts-node-dev src/index.ts
```
The server will start at http://localhost:3000.

## Testing the Application
Tests are written using Jest and Supertest. To run the tests:
```bash
npm test
```

## API Documentation

This project uses **Swagger** for API documentation. The documentation is accessible via the Swagger UI, which provides a visual interface for exploring and testing the API.

The Swagger documentation is configured in the `swagger.ts` file located in the `src/utils` folder.

### Accessing the Documentation
Once the server is running, open your browser and navigate to:
http://localhost:3000/api-docs

The following endpoints are documented in Swagger:
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **GET** `/api/users/profile`: Retrieve the authenticated user's profile.
- **PUT** `/api/users/profile`: Update the user's profile.
- **DELETE** `/api/users/profile`: Delete the user's profile.

## Author

This project was developed by **Anna Gracheva (https://github.com/agrach060)**.