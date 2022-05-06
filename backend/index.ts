import path from "path";
import mongoose from "mongoose";
import router from "./src/routes";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import envConfig from "./src/configs/env.config";

// Connect to mongoDB using moongose
mongoose.connect(
    envConfig.mongoDB.url,
    {
        dbName: envConfig.mongoDB.db
    }
);


// Setup Express
const app : Express = express();
app.use(express.json());
app.use(cookieParser());


// Define public folders
app.use(express.static(path.join(__dirname, 'public'), {}));
app.use(express.static(path.join(__dirname, '../frontend/build'), {}));


// Routes
app.use('/api', router);


// Entry point
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/bundle.html'), e => {
        if (e) return res.status(404).json({
            msg: 'Frontend has not been built'
        });
    });
});


// Error handling, request was not found
app.use((_req, res, _next) => {
    const error : Error = new Error('not found');
    return res.status(404).json({msg: error.message});
});


// Start express
const PORT = 3000;
app.listen(PORT, () => console.log(`App is now live: http://localhost:${PORT}`));


export {};  // isolatedModules in tsconfig.json