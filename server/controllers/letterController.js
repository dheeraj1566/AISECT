const Letter = require('../models/Letter');
const sgMail = require('@sendgrid/mail');
const pdf = require('pdf-lib');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Create and Send Letter
exports.writeLetter = async (req, res) => {
  const { author, recipient, content } = req.body;
  const letter = new Letter({ author, recipient, content });
  await letter.save();

  const msg = {
    to: recipient,
    from: process.env.SENDER_EMAIL,
    subject: "New Letter Received",
    text: content
  };
  await sgMail.send(msg);

  res.json({ message: "Letter sent and stored" });
};

// Generate PDF for Letter
exports.downloadPDF = async (req, res) => {
  const letter = await Letter.findById(req.params.id);
  if (!letter) return res.status(404).json({ message: "Letter not found" });

  const pdfDoc = await pdf.PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  page.drawText(`From: ${letter.author}\nTo: ${letter.recipient}\n\n${letter.content}`, { x: 50, y: 350 });

  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=letter.pdf`);
  res.send(pdfBytes);
};
