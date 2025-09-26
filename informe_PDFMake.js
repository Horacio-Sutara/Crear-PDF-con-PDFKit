import PdfPrinter from "pdfmake";
import fs from "fs";

// Definir fuentes (usa Carlito para reemplazar Calibri de forma libre)
const fonts = {
  Roboto: {
    normal: "node_modules/pdfmake/build/vfs_fonts.js", // solo para evitar error
  },
  Carlito: {
    normal: 'C:/Windows/Fonts/calibri.ttf',
    bold: 'C:/Windows/Fonts/calibrib.ttf',
    italics: 'C:/Windows/Fonts/calibrii.ttf',
    bolditalics: 'C:/Windows/Fonts/calibriz.ttf',
  },
};

const printer = new PdfPrinter(fonts);

// Datos de prueba
const paciente = {
  apellido_nombre: "Pérez, Juan",
  obra_social: "OSDE",
  dni: "12.345.678",
  fecha_nacimiento: "15/09/2014",
  escuela: "Colegio San Martín",
  grado: "5º A",
  diagnostico_cud: "Trastorno del neurodesarrollo (CUD 123456)",
  cuerpo: "El paciente presenta avances significativos en sus habilidades sociales...",
};

// Planilla de asistencia de ejemplo
const asistencias = [
  ["Fecha", "Presente", "Observaciones"],
  ["01/09/2025", "✔️", ""],
  ["02/09/2025", "❌", "Ausente sin aviso"],
  ["03/09/2025", "✔️", ""],
];

const docDefinition = {
  content: [
    { text: "Informe de Paciente", style: "header" },
    {
      table: {
        widths: ["*"],
        body: [
          [`Apellido y Nombre: ${paciente.apellido_nombre}`],
          [`Obra Social: ${paciente.obra_social}`],
          [`DNI: ${paciente.dni}`],
          [`Fecha de Nacimiento: ${paciente.fecha_nacimiento}`],
          [`Escuela/Colegio: ${paciente.escuela}`],
          [`Grado/Curso: ${paciente.grado}`],
          [`Diagnóstico según CUD: ${paciente.diagnostico_cud}`],
        ],
      },
      layout: "noBorders",
      margin: [0, 10, 0, 10],
    },
    { text: "Cuerpo del Informe", style: "subheader" },
    { text: paciente.cuerpo, margin: [0, 5, 0, 20] },

    { text: "Planilla de Asistencia", style: "header" },
    {
      table: {
        headerRows: 1,
        widths: ["auto", "auto", "*"],
        body: asistencias,
      },
    },
  ],
  styles: {
    header: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 10],
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
    },
  },
  defaultStyle: {
    font: "Carlito",
    fontSize: 11,
    lineHeight: 1.3,
  },
};

const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("informe_calibri_2.pdf"));
pdfDoc.end();

console.log("✅ Informe generado: informe.pdf");
