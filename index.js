import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'URL',
      message: 'Type URL:',
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url, { type: 'png' });

    // Save the QR code image
    qr_svg.pipe(fs.createWriteStream('qrimg.png')).on('finish', () => {
      console.log('QR image created successfully.');
    }).on('error', (err) => {
      console.error('Error creating QR image:', err);
    });

    // Save the URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        console.error('Error saving URL to file:', err);
      } else {
        console.log('The file has been saved!');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Something else went wrong:', error);
    }
  });
