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

