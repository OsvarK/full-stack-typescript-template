import { Router } from "express";
import controller from "./authentication.controllers";

const router : Router = Router();


router.post('/signup', controller.createAccount);

// Admin routes
router.get('/accounts', controller.getAllAccounts);


export default router;