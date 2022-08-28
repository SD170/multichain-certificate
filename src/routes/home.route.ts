import { Request, Response, NextFunction, Router } from "express";


const router = Router();

router.route("").get((req:Request, res:Response)=>{
    res.render('home');
});

export default router;
