"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const async_1 = __importDefault(require("../middlewares/async"));
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const uuid_1 = require("uuid");
const pdfCreator_1 = require("../utils/pdfCreator");
//  @desc       upload a file
//  @route      POST /uploadFiles/excel
//  @access     public
exports.uploadFile = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // reading the uploaded excel files
    const fileSheet = node_xlsx_1.default.parse(`${__dirname}/../../${req.file.path}`);
    const nameData = fileSheet[0].data;
    // publising on multichain as data stream
    for (let i = 1; i < nameData.length; i++) {
        // formatting data appropriately for multichain
        const info = {
            name: nameData[i][0],
            course: nameData[i][1],
            marks: nameData[i][2]
        };
        // formatting data appropriately for multichain
        const streamData = {
            json: info
        };
        // key for multichain
        const streamKey = (0, uuid_1.v4)();
        // publishing
        const txnID = yield req.multichain.publish({ stream: process.env.MULTICHAIN_CERT_STREAM_TXN, key: streamKey, data: streamData });
        // creating the certificates
        yield (0, pdfCreator_1.createCertificate)(info.name, info.course, info.marks, streamKey);
    }
    // redirecting to the homepage
    res.redirect(`/?toast=certificate-generated-successfully`);
}));
