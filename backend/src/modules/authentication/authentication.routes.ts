import { Router } from "express";
import controller, { adminController } from "./authentication.controllers";

const router : Router = Router();


router.post('/login/google', controller.loginGoogle);
router.post('/login', controller.loginUser);
router.post('/signup', controller.createAccount);
router.get('/logout', controller.logoutUser);
router.get('/verify', controller.verifyUser);

// Admin routes
router.get('/accounts', adminController.getAllAccounts);


export default router;