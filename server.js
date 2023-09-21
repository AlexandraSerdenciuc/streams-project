const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 3000;

//without streams
// app.get('/pdf', (req, res) => {
//   const pdfPath = path.join(__dirname, 'javascript_tutorial.pdf');

//   fs.readFile(pdfPath, (err, data) => {
//     if (err) {
//       res.status(500).send('Error reading PDF file.');
//     } else {
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'inline; filename=javascript_tutorial.pdf');
//       res.send(data);
//     }
//   });
// });

app.get('/pdf', (req, res) => {
    const pdfPath = path.join(__dirname, '20000-Leagues-Under-the-Sea.pdf');
    const pdfStream = fs.createReadStream(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=20000-Leagues-Under-the-Sea.pdf');
    pdfStream.pipe(res);

    pdfStream.on('error', (err) => {
        res.status(500).send('Error reading PDF file.');
    });

    pdfStream.on('end', () => {
        res.end();
    });
});


app.get('/', (req, res) => {
    res.redirect('/pdf');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});