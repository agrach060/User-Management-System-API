require('dotenv').config();

if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET not set! Setting default for tests.");
    process.env.JWT_SECRET = "test_secret"; // Set a fallback secret for testing
}

console.log("JWT_SECRET in Jest setup:", process.env.JWT_SECRET);
