// mailer.tsxr1ck.com Microservice
// This file sets up a simple Express server with a single endpoint
// that sends emails using Nodemailer.

// Import necessary libraries
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from the appropriate .env file
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to enable CORS for requests from http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// --- CONFIGURATION ---
// SMTP configuration is now loaded from environment variables for security
const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport(smtpConfig);

// Verify the connection to the SMTP server
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to SMTP server:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// --- API ENDPOINT ---

// Intro page for the root route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mailer Microservice</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; color: #222; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 60px auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); padding: 40px; }
                h1 { color: #2a5bd7; margin-bottom: 0.5em; }
                p { font-size: 1.1em; line-height: 1.7; }
                .footer { margin-top: 2em; color: #888; font-size: 0.95em; }
                code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📧 Mailer Microservice</h1>
                <p>
                    Welcome to <b>mailer.tsxr1ck.com</b>!<br>
                    This microservice provides a simple API for sending emails using <code>POST /send-email</code>.<br>
                    <br>
                    <b>How to use:</b><br>
                    Send a <code>POST</code> request to <code>/send-email</code> with the following JSON body:
                </p>
                <pre style="background:#f8f8fa;padding:12px;border-radius:8px;overflow-x:auto;">
{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "html": "<h1>Hello!</h1>",
  "appName": "YourAppName"
}
                </pre>
                <p class="footer">
                    Powered by <a href="https://github.com/tsxr1ck/mailer" target="_blank">tsxr1ck/mailer</a> &mdash; Node.js, Express, and Nodemailer.
                </p>
            </div>
        </body>
        </html>
    `);
});

// This is the single endpoint your other applications will call.
app.post('/send-email', async (req, res) => {
    // Use a try-catch block to handle any errors during email sending
    try {
        // Extract data from the request body
        const { to, subject, html, appName } = req.body;

        // Validate the required fields
        if (!to || !subject || !html || !appName) {
            return res.status(400).json({ error: 'Missing required parameters: to, subject, html, or appName.' });
        }

        // Dynamically create the "from" field based on the appName provided
        const fromName = appName;
        const fromEmail = process.env.SMTP_USER;
        const fromString = `"${fromName}" <${fromEmail}>`;

        // Define the email options using the data from the request
        const mailOptions = {
            from: fromString,
            to: to,
            subject: subject,
            html: html,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Log the success and send a success response
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({
            message: "Email sent successfully",
            messageId: info.messageId,
        });
    } catch (error) {
        // If an error occurs, log it and send a 500 server error response
        console.error("Error sending email:", error);
        res.status(500).json({
            error: "Failed to send email",
            details: error.message,
        });
    }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Email service running at http://localhost:${port}`);
    console.log('Use this service by making a POST request to /send-email');
});

