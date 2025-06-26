document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById('submit-button');
  const idInput = document.getElementById('change-id');
  const emailBDInput = document.getElementById('change-email-bd');
  const emailInput = document.getElementById('change-email');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (emailBDInput.value !== emailInput.value) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El email digitado no coincide con el email del usuario',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try {
      const id = idInput.value;
      const email = emailInput.value;
      const url = '/api/auth/change-password/' + id + '/' + email;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Falló la solicitud de cambio de constraseña',
          confirmButtonColor: '#dc3545'
        });
        return;
      } else if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Email enviado',
          text: 'A tu correo se ha enviado un enlace para acceder al cambio de contraseña',
          confirmButtonColor: '#28a745',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((result) => {
          window.location.href = '/';
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Servidor',
        text: 'Hay un error interno en el servidor. Por favor, inténtelo más tarde.',
        confirmButtonColor: '#d33'
      });
      console.error('Error:', error);
    }
  })
});