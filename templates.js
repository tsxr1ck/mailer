
const welcomeEmailTemplate = (appName) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to ${appName}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #ffffff;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 70px 30px;
      text-align: center;
    }
    h1 {
      font-size: 36px;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 17px;
      line-height: 1.6;
      color: #cbd5e1;
      margin: 25px 0 0;
      font-weight: 300;
    }
    .cta {
      display: inline-block;
      margin-top: 40px;
      padding: 14px 32px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 12px;
    }
    .footer {
      font-size: 13px;
      color: #64748b;
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to ${appName}</h1>
    <p>You’re officially part of the journey. ${appName} is designed to give you a seamless, intuitive experience that feels effortless from the start.</p>
    <a href="#" class="cta">Get Started</a>
    <div class="footer">© ${new Date().getFullYear()} ${appName}. All rights reserved.</div>
  </div>
</body>
</html>
`;

const generateOTPEmail = (subject, otpCode, appName, baseUrl, token) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject} - ${appName}</title>
  <style>
    body, table, td, div, p {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #f7fafc;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }
    .header {
      background-color: #1e293b;
      padding: 40px 30px;
      color: #ffffff;
      text-align: center;
    }
    .content {
      padding: 40px 30px;
      color: #4b5563;
      line-height: 1.6;
    }
    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    p {
      font-size: 16px;
      margin: 20px 0;
    }
    .otp-code {
      display: inline-block;
      margin: 30px 0;
      padding: 15px 30px;
      font-size: 32px;
      font-weight: bold;
      color: #1e293b;
      background-color: #e2e8f0;
      border-radius: 8px;
      letter-spacing: 2px;
      border: 2px dashed #94a3b8;
    }
    .button {
    display: inline-block;
    margin-top: 20px;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}
.button:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}
    .footer {
      padding: 20px 30px;
      font-size: 13px;
      color: #9ca3af;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${subject}</h2>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up for ${appName}. To complete your registration, please use the secure code below or click the button to verify your email address.</p>
      <div style="text-align: center;">
        <div class="otp-code">${otpCode}</div>
      </div>
      <p>The button below will automatically verify your email for you. If the button doesn't work, you can copy the code and enter it manually on the verification page.</p>
      <div style="text-align: center;">
        <a href="${baseUrl}/verifyEmail/${token}/${otpCode}" class="button">Verify Email</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Export
module.exports = {
    welcomeEmailTemplate,
    generateOTPEmail
};
