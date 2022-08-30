import PDFDocument, { underline } from "pdfkit";
import fs from "fs";


export const createCertificate = async (name: string, course: string, marks: string, streamKey:string) => {

    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
    });

    doc.pipe(fs.createWriteStream(`./generated/${name}-${streamKey}.pdf`));
    // white background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

    // green margin
    const distanceMargin = 18;

    doc
        .fillAndStroke('#AAFF00')
        .lineWidth(20)
        .lineJoin('round')
        .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2,
        )
        .stroke();


    // adding congratulations:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text('congratulations', {
            align: 'center',
            lineGap: 100
        }
        );

    // adding name
    doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .fill('#021c27')
        .text(`${name.toLocaleUpperCase()}`, {
            align: 'center',
        }
        );
    // adding course:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text(`on completing`, {
            align: 'center',
        }
        );
    doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .fill('#021c27')
        .text(`${course}`, {
            align: 'center',
        }
        );


    // adding marks:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#021c27')
        .text(`with ${marks} percent marks`, {
            align: 'center',
            lineGap: 100
        }
        );


    // check validity:
    doc
        .font('Helvetica')
        .fontSize(15)
        .fill('#0e38a1')
        .text('check validity', {
            align: 'center',
            link: `http://${process.env.RPC_HOST}:${process.env.PORT}/validate/certificate/${streamKey}`,
            underline:true
        }
        );

    doc.end();
    return;
}
