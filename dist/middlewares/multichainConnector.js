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
exports.multichainMW = void 0;
const multichain_node_1 = __importDefault(require("multichain-node"));
const async_1 = __importDefault(require("./async"));
exports.multichainMW = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const multichain = (0, multichain_node_1.default)({
        port: process.env.RPC_PORT,
        host: process.env.RPC_HOST,
        user: process.env.RPC_USER,
        pass: process.env.RPC_PASSWORD,
    });
    // console.log(multichain);
    yield multichain.getInfo();
    req.multichain = multichain;
    next();
}));
