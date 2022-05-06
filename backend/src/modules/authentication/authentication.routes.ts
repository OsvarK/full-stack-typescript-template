import { Router } from "express";
import controller from "./authentication.controller";

const router : Router = Router();

router.post('/signup', controller.createAccount);

export default router;