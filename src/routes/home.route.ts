import { Request, Response, NextFunction, Router } from "express";
import { homeRender } from '../controllers/home.controller';


const router = Router();

router.route("").get(homeRender);

export default router;
