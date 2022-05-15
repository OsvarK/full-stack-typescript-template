import dotenv from "dotenv";

// Binds the .env parameters to an object which can be imported anywhere in the project

dotenv.config();

const envConfig = {
    url: process.env.URL || "http://localhost:3000",
    mongoDB: {
        url: process.env.MONGODB_DATABASE_URL || 'no connection string',
        db: process.env.MONGODB_DATABASE_NAME || 'no database name'
    },
    secrets: {
        passwordHash:  process.env.SECRET_PASSWORD_HASH || 'no password secret',
        googleClientId:  process.env.GOOGLE_CLIENT_ID || 'no google client id',
        jwt: process.env.JWT_SECRET || 'No Jwt Secret'
    },
    names: {
        authCookie: process.env.AUTH_COOKIE_NAME || 'Token'
    },
    email: {
        service: process.env.EMAIL_SERVICE || 'No service',
        user: process.env.EMAIL_USER || 'No user',
        pass: process.env.EMAIL_PASS || 'No pass',
    }
}

export default envConfig;