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
exports.createCertificate = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const createCertificate = (name, course, marks, streamKey) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new pdfkit_1.default({
        layout: 'landscape',
        size: 'A4',
    });
    doc.pipe(fs_1.default.createWriteStream(`./generated/${name}-${streamKey}.pdf`));
    // white background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
    // green margin
    const distanceMargin = 18;
    doc
        .fillAndStroke('#AAFF00')
        .lineWidth(20)
        .lineJoin('round')
        .rect(distanceMargin, distanceMargin, doc.page.width - distanceMargin * 2, doc.page.height - distanceMargin * 2)
        .stroke();
    // adding congratulations:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text('congratulations', {
        align: 'center',
        lineGap: 100
    });
    // adding name
    doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .fill('#021c27')
        .text(`${name.toLocaleUpperCase()}`, {
        align: 'center',
    });
    // adding course:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text(`on completing`, {
        align: 'center',
    });
    doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .fill('#021c27')
        .text(`${course}`, {
        align: 'center',
    });
    // adding marks:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text(`with ${marks} percent marks`, {
        align: 'center',
        lineGap: 100
    });
    // check validity:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#0e38a1')
        .text('check validity', {
        align: 'center',
        link: `http://${process.env.RPC_HOST}:${process.env.PORT}/validate/certificate/${streamKey}`,
        underline: true
    });
    doc.end();
    return;
});
exports.createCertificate = createCertificate;
