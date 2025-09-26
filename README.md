Asegúrate de tener Node.js instalado.
    Verifica con:

    node -v

Instala la librería pdfkit si no la tienes:

    npm install pdfkit

Cambiar ruta donde se tiene la fuente:
    doc.registerFont('Carlito', 'D:/Descargas/Rar/carlito/Carlito-Regular.ttf');

Ejecuta el script:

    node index.js


Se generará un archivo ejemplo_carlito.pdf en la misma carpeta.