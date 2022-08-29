import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../middlewares/async";
import { createCertificate } from '../utils/pdfCreator';



//  @desc       render home page
//  @route      GET /
//  @access     public
export const homeRender = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // createCertificate("Saswata D.","Game", "100");
    res.render('home', {
        toast: req.query.toast
    });

});