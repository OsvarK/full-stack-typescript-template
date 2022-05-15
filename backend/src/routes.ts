import { Router } from "express";

// Import the routes from all the modules
import { default as authenticationRouter } from "./controllers/authentication/authentication.routes";

const router : Router = Router();

// Assign the imported routes to an route
router.use('/auth', authenticationRouter);


export default router;