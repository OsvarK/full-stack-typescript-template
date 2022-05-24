import { Router } from "express";
import authenticationController from "./controllers/authentication.controller";
import adminController from "./controllers/admin.controller";
import isAdmin from "./middlewares/admin.middleware";

const router : Router = Router();

// authentication.controller
const authenticationRouter : Router = Router();
router.use('/', authenticationRouter);

authenticationRouter.delete('/', authenticationController.deleteAccount);
authenticationRouter.post('/login/google', authenticationController.loginGoogle);
authenticationRouter.post('/login', authenticationController.loginUser);
authenticationRouter.patch('/update/info', authenticationController.updateAccountInfo);
authenticationRouter.patch('/update/password', authenticationController.updatePassword);
authenticationRouter.patch('/update/email', authenticationController.updateEmail);
authenticationRouter.post('/signup', authenticationController.createAccount);
authenticationRouter.get('/logout', authenticationController.logoutUser);
authenticationRouter.get('/verify', authenticationController.verifyUser);
authenticationRouter.get('/verifyemail/:jwt', authenticationController.verifyEmail);


// admin.controller
const adminRouter : Router = Router();
router.use('/admin', isAdmin, adminRouter);

adminRouter.get('/accounts', adminController.getAllAccounts);




export default router;