import { NextFunction, Request, Response } from 'express';
import multichainNode from "multichain-node";
import asyncHandler from './async';

export const multichainMW = asyncHandler(async (req: RequestExtended, res: Response, next: NextFunction) => {
    
    const multichain = multichainNode({
        port: process.env.RPC_PORT,
        host: process.env.RPC_HOST,
        user: process.env.RPC_USER,
        pass: process.env.RPC_PASSWORD,
        // rpcallowip:"0.0.0.0/0"
    });
    
    // console.log(multichain);

    await multichain.getInfo();
    
    req.multichain=multichain;

    next();

});

