import {Router} from "express";
import {getAllUsers,signUp} from "../controllers/user.controller.js";

const router = Router();

router.get("/get-all-users",getAllUsers);

router.post("/sign-up",signUp);



export default router;