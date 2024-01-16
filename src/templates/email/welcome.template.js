module.exports = (email, username, password) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Platform</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
          }
  
          .container {
              background-color: #ffffff;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
  
          h2 {
              color: #333;
          }
  
          p {
              margin-bottom: 20px;
              color: #555;
          }
  
          strong {
              color: #333;
          }
  
          .warning {
              color: #ff6347;
              font-weight: bold;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <h2>Welcome to Our Platform!</h2>
          <p>Congratulations! Your account has been successfully registered. Here are your login credentials:</p>
          <p><strong>email:</strong> ${email}</p>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>Please keep this information secure. Do not share your login credentials with anyone.</p>
          <p>If you did not request this registration, please contact our support team immediately.</p>
          <p>Thank you for joining us!</p>
          <p class="warning">Note: For security reasons, please do not share this information with anyone.</p>
      </div>
  </body>
  
  </html>
  `
}