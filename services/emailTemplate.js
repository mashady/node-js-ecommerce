export function emailTemplate(email) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f2f2f2;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
            }
            h1 {
              font-size: 24px;
              color: #333333;
              text-align: center;
            }
            p {
              font-size: 14px;
              color: #333333;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: block;
              width: 200px;
              background-color: #F8485E;
              color: #ffffff;
              text-align: center;
              padding: 10px;
              text-decoration: none;
              border-radius: 25px;
              margin: 0 auto;
              font-weight: bold;
            }
            .footer {
              font-size: 12px;
              color: #999999;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Welcome to Our Service!</h1>
            <p>Thank you for signing up. To complete your registration, please verify your email address.</p>
            <a href="http://localhost:8088/verify/${email}" class="button">Verify Email</a>
            <p class="footer">If you did not sign up, please ignore this email.</p>
          </div>
        </body>
      </html>
    `;
}
