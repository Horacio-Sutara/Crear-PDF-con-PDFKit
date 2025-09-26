const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 56.7, bottom: 56.7, left: 56.7, right: 56.7 }
});

doc.pipe(fs.createWriteStream('ejemplo_carlito.pdf'));

// Fuente personalizada
doc.registerFont('Carlito', 'D:/Descargas/Rar/carlito/Carlito-Regular.ttf');
doc.font('Carlito').fontSize(11);

// 🔹 Encabezado (en la parte superior de cada página)
function addHeader(doc, text) {
  doc.fontSize(10)
     .text(text, doc.page.margins.left, 30, { align: 'center', width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
  doc.moveDown();
}

// 🔹 Pie de página (con número de página)
function addFooter(doc) {
  const range = doc.bufferedPageRange(); // obtiene número de páginas
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.fontSize(9)
       .text(`Página ${i + 1} de ${range.count}`, 0, doc.page.height - 50, { align: 'center', width: doc.page.width });
  }
}

// Escribir encabezado en la primera página
addHeader(doc, "Informe de Ejemplo - Encabezado");

// Cuerpo del documento
const text = `Este es un ejemplo de PDF generado con PDFKit usando Carlito.
Los márgenes son de 2 cm, el tamaño de fuente es 11 y el interlineado es 2.5.`;

// Interlineado con `lineGap`
doc.text(text, { lineGap: 11 * 1.5 });

// Nueva página de ejemplo
doc.addPage();
addHeader(doc, "Segunda página - Encabezado");
doc.text("Aquí empieza la segunda página con otro encabezado.", { lineGap: 11 * 1.5 });

// 🔹 Agregar pie de página a todas las páginas
doc.on('end', () => console.log('PDF generado con encabezado y pie de página.'));
doc.end();
addFooter(doc);
