const http = require('http');
const nodemailer = require('nodemailer');
const { SESClient } = require('@aws-sdk/client-ses');
require('dotenv').config(); // Load environment variables

// Create a new AWS SES client
const ses = new SESClient({
  region: 'us-east-1', // Replace with your SES region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws: require('@aws-sdk/client-ses') },
});

// Define the HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/send-email' && req.method === 'GET') {
    // Email options
    const mailOptions = {
      from: process.env.SENDER_MAIL, // Replace with your verified sender email
      to: process.env.REVEIVER_MAIL, // Recipient email address
      subject: 'Hello from AWS SES!',
      text: 'This email was sent using AWS SES with Nodemailer.',
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Email sent successfully: ${info.response}`);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Error sending email: ${err.message}`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Route not found');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
