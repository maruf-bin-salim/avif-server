import cors from 'cors';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import sharp from 'sharp';

const corsMiddleware = cors();

export default function handler(req, res) {
  corsMiddleware(req, res, () => {
    if (req.method === 'POST') {
      const imageDataUrl = req.body.image;

      // Convert data URL to buffer
      const buffer = dataUriToBuffer(imageDataUrl);

      // Process the buffer as needed
      sharp(buffer)
        .toFormat('heif', { quality: 30, compression: 'av1' })
        .toBuffer()
        .then(outputBuffer => {
          // Send the converted AVIF buffer as a response
          res.setHeader('Content-Type', 'image/avif');
          res.send(outputBuffer);
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Error converting the image');
        });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  });
}

