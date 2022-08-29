declare module 'multichain-node';

interface RequestExtended extends Request {
    files: any,
    file: any,
    fields: any,
    multichain: any
}