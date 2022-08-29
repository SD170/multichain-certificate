import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../middlewares/async";



//  @desc       render home page
//  @route      GET /
//  @access     public
export const homeRender = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {


    res.render('home', {
        toast: req.query.toast
    });

});