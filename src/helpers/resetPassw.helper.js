import { sendEmail } from "./sendEmail.helper.js";

const resetPassword = async (id, email, userName) => {
  try {
    const subject = "Email para cambio de contraseña";
    const url = process.env.URL + "/new-password/" + id;
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
                <h1>¡Saludos desde MUSIC VINILS!</h1>
                <p>Hola <strong>${userName}</strong>, por favor seguir el enlace a través del botón Solicitar cambio para realizar el cambio de contraseña.</p>
            </div>
      
            <!-- Botón de solicitud -->
            <div class="verify-button">
                <a href="${url}">Solicitar cambio</a>
            </div>
            
            <!-- Footer simple -->
            <div class="footer">
                <p>Este enlace expira en 24 horas • Si no solicitaste esto, ignora este correo</p>
            </div>
          </div>
        </body>
      </html>`
    sendEmail(email, subject, body);
  } catch (error) {
    throw error
  }
}

export { resetPassword };