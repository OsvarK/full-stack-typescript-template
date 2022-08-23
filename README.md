# Full Stack Typescript Template using React & Express.js

Full Stack Typescript Template using [React](https://www.npmjs.com/package/react) and [Express.js](https://www.npmjs.com/package/express)

## Installation

Normal node installation, meaning you only need to run `npm install` then create an **.env** file in the root folder.

#### Table displaying the necessary parameters in the .env file

| Parameters            | Description                       |
| --------------------- | --------------------------------- |
| MONGODB_DATABASE_URL  | Connection string to your MongoDB |
| MONGODB_DATABASE_NAME | Name of the Database in MongoDB   |
| SECRET_PASSWORD_HASH | Your secret for hasing the passwords   |
| GOOGLE_CLIENT_ID | Your Google Client ID   |
| JWT_SECRET | Your secret for JWT |
| AUTH_COOKIE_NAME | not required, add this to change token name   |
| EMAIL_SERVICE | Service for nodemailer  |
| EMAIL_USER | User for nodemailer  |
| EMAIL_PASS | Password for nodemailer   |

&nbsp;

## Node Scripts | How to run the application

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| npm run frontend       | Starts React in development mode    |
| npm run backend        | Starts the backend                  |
| npm run build-frontend | Tells webpack to build the frontend |

To view to application in production mode, first build the frontend then start the backend.

## License

[MIT](https://choosealicense.com/licenses/mit/)
