import { transport, sendEmail } from "./sendEmail.helper.js";

const verifyEmail = async (email, verifyCode, userName) => {
  try {
    const subject = "Email de verificación de cuenta";
    const url = process.env.URL + "/verify/" + email;
    const body =
      `<!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verificación de Cuenta</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            .container {
                max-width: 500px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .welcome {
                text-align: center;
                margin-bottom: 30px;
            }
            .welcome h1 {
                color: #2c3e50;
                font-size: 24px;
                margin-bottom: 10px;
            }
            .welcome p {
                color: #666;
                font-size: 16px;
            }
            .verification-code {
                background-color: #e3f2fd;
                border: 2px solid #007bff;
                text-align: center;
                padding: 25px;
                margin: 30px 0;
                border-radius: 8px;
            }
            .code-label {
                color: #666;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .code {
                font-size: 32px;
                font-weight: bold;
                color: #007bff;
                letter-spacing: 4px;
                font-family: 'Courier New', monospace;
            }
            .verify-button {
                text-align: center;
                margin: 30px 0;
            }
            .verify-button a {
                display: inline-block;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-weight: 500;
                font-size: 16px;
                transition: background-color 0.3s ease;
            }
            .verify-button a:hover {
                background-color: #0056b3;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #888;
                font-size: 12px;
            }
        
            @media only screen and (max-width: 480px) {
              .container {
                  padding: 25px;
                  margin: 10px;
              }
              .welcome h1 {
                  font-size: 20px;
              }
              .code {
                  font-size: 28px;
                  letter-spacing: 3px;
              }
              .verify-button a {
                  padding: 10px 25px;
                  font-size: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Mensaje de bienvenida -->
            <div class="welcome">
                <h1>¡Bienvenido a MUSIC VINILS!</h1>
                <p>Hola <strong>${userName}</strong>, gracias por registrarte en nuestra plataforma. Para completar tu registro y activar tu cuenta, necesitamos verificar tu dirección de correo electrónico.</p>
            </div>
      
            <!-- Código de verificación -->
            <div class="verification-code">
                <div class="code-label">Tu código de verificación es:</div>
                <div class="code">${verifyCode}</div>
            </div>
      
            <!-- Botón de verificación -->
            <div class="verify-button">
                <a href="${url}">Verificar mi cuenta</a>
            </div>
            
            <!-- Footer simple -->
            <div class="footer">
                <p>Este código expira en 24 horas • Si no solicitaste esto, ignora este correo</p>
            </div>
          </div>
        </body>
      </html>`
    sendEmail(email, subject, body);
  } catch (error) {
    throw error
  }
}

export { verifyEmail };
