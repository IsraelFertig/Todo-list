import {Router} from "express";
import {getAllUsers,signUp , signIn} from "../controllers/user.controller.js";

const router = Router();

router.get("/get-all-users",getAllUsers);

router.post("/sign-up",signUp);

router.post("/sign-in",signIn);



export default router;