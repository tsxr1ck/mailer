# Mailer Microservice

A simple Node.js microservice for sending emails using Express and Nodemailer. Designed for easy integration with other applications via a single POST endpoint.

## Features
- Send emails via a REST API
- CORS enabled for frontend integration
- Environment-based configuration for security (dotenv)
- Supports both development and production environments

## Requirements
- Node.js (v16 or newer recommended)
- pnpm (or npm/yarn)

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/mailer.git
   cd mailer
   ```

2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.development` and `.env.production` and fill in your SMTP credentials.
   - Never commit your real credentials to git!

4. **Run in development:**
   ```sh
   node server.js
   ```

5. **Run in production:**
   ```sh
   set NODE_ENV=production && node server.js
   ```

## API

### POST /send-email
Send an email via the service.

**Request Body (JSON):**
```
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "html": "<b>Hello!</b>",
  "appName": "YourAppName"
}
```

**Response:**
- `200 OK` on success
- `400` if required fields are missing
- `500` on server error

## Security
- SMTP credentials are loaded from environment files using `dotenv`.
- All `.env*` files are gitignored by default.

## License
MIT
