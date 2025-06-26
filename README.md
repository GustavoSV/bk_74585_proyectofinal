# Music Vinils tienda de música en formatos especiales

Consta de las sisguientes vistas:
  - Home: Se muestra todo el catálogo de títulos musicales en sus diferentes formatos
  - Detalle-Producto: tiene toda la información referente a cada título
    - No está funcionando enviar producto al carrito
  - Carrito: Permite ver los ítems seleccionados por el usuario para comprar
    - Por ahora no están funcionando las acciones de cambiar cantidades o eliminar o pagar
  - Iniciar sesión: Permite al usuario loguearse en la tienda
  - Registrarse: Le permite a un usuario registrarse en el sistema y validar su dirección de correo electrónico
  - Usuario (nombre)
    - Perfil: Muestra la información del usuario activo
    - Cambiar contraseña: Permite el cambio de contraseña usando un mensaje de correo para verificación
    - Cerrar sesión: Cierra la sesión del usuario

## Modificaciones para el proyecto final

Se trabajaron los siguientes aspectos:
  - Se separó el proyecto en diferentes capas para mejor manejo y legibilidad
    - Capa de renderización o vista: incluye las vistas de handlebars
    - Capa de Routing: diferentes rutas o el enrutamiento o endpoints que son el contacto con la capa de vistas
    - Capa de lógica de negocio: conceptos de validación y respuesta al usuario
    - Capa de servicios: intermediario entre controlador y persistencia
    - Capa de Persistencia: considera los métodos para el almacenamiento físico de la información y la comunicación con la lógica del negocio
  - Implementación de los patrones de diseño 
    - DAO: diferentes fuentes de datos como filesystem, memory y mongo
    - Factory: facilita la selección de la persistencia
    - DTO: traduce de ser necesario la estructura para que todos los datos puedan funcionar en los diferentes persistencias de acuerdo a los DAO existentes
    - Repository: llama métodos del DAO
  - Implementación del servicio de Mailing
    - Nodemailer: servicio de Google que permite el envío de correos electrónicos, fueron implementados para validar el registro del usuario a través de su cuenta de correo y un código de validación, y para facilitar la seguridad en el cambio de contraseña