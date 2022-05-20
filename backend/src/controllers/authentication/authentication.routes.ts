import { Router } from "express";
import controller, { adminController } from "./authentication.controller";

const router : Router = Router();

router.post('/delete/:password', adminController.deleteAccount);
router.post('/login/google', controller.loginGoogle);
router.post('/login', controller.loginUser);
router.patch('/update', controller.updateAccount);
router.post('/signup', controller.createAccount);
router.get('/logout', controller.logoutUser);
router.get('/verify', controller.verifyUser);
router.get('/verifyemail/:jwt', controller.verifyEmail);

// Admin routes
router.get('/admin/account', adminController.getAllAccounts);


export default router;