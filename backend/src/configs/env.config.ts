import dotenv from "dotenv";

// Binds the .env parameters to an object which can be imported anywhere in the project

dotenv.config();

const envConfig = {
    mongoDB: {
        url: process.env.MONGODB_DATABASE_URL || 'no connection string',
        db: process.env.MONGODB_DATABASE_NAME || 'no database name'
    },
    secrets: {
        passwordHash:  process.env.SECRET_PASSWORD_HASH
    }
}

export default envConfig;