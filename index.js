
require('dotenv').config();
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Bot de Natuamigos encendido');
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu',
      '--disable-canvas-aa',
      '--disable-2d-canvas-clip-aa',
      '--disable-gl-drawing-for-tests',
    ],
  },
});

client.on('qr', async (qr) => {
  try {
    const pairingCode = await client.requestPairingCode('573173687431');
    console.log(`=== TU CÓDIGO DE VINCULACIÓN ES: ${pairingCode} ===`);
  } catch (error) {
    console.error('Error solicitando el código de emparejamiento:', error);
  }
});

client.on('ready', () => {
  console.log('¡Cliente de WhatsApp conectado y listo!');
});

client.on('message', (message) => {
  if (message.body) {
    message.reply('Hola, soy yo');
  }
});

client.initialize();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
