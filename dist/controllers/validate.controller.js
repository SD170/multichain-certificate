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
exports.validateCert = void 0;
const async_1 = __importDefault(require("../middlewares/async"));
//  @desc       verify certificate
//  @route      GET /validate/certificate/:streamKey
//  @access     public
exports.validateCert = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { streamKey } = req.params;
    // fetching
    // getStreamKeySummary: NA
    const chainData = yield req.multichain.listStreamKeyItems({ stream: process.env.MULTICHAIN_CERT_STREAM_TXN, key: streamKey, count: 1 });
    // validity
    let isValid = false;
    let data = {
        name: "",
        course: "",
        marks: ""
    };
    if (chainData.length > 0) {
        isValid = true;
        data = (_b = (_a = chainData[chainData.length - 1]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.json;
    }
    // render
    // console.log(data);
    res.render("validate", { name: data.name, course: data.course, marks: data.marks, isValid });
}));
