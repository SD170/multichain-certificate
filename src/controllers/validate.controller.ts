import { Request, Response, NextFunction } from 'express';
import { json } from 'stream/consumers';
import asyncHandler from "../middlewares/async";


//  @desc       verify certificate
//  @route      GET /validate/certificate/:streamKey
//  @access     public
export const validateCert = asyncHandler(async (req: RequestExtended, res: Response, next: NextFunction) => {

    const { streamKey } = req.params;

    // fetching
    // getStreamKeySummary: NA
    const chainData = await req.multichain.listStreamKeyItems({ stream: process.env.MULTICHAIN_CERT_STREAM_TXN, key: "cr7", count: 1 });

    // validity
    let isValid = false;
    let data = {};
    if (chainData.length > 0) {
        isValid = true;
        data = chainData[chainData.length - 1]?.data?.json;
    }

    // render
    console.log(data);
    res.render("validate", { data:JSON.stringify(data), isValid });

});