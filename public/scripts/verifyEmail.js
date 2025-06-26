document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById('submit-button');
  const emailInput = document.getElementById('verify-email');
  const codeInput = document.getElementById('verify-code');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: emailInput.value,
        code: codeInput.value,
      }
      const url = '/api/auth/verify/' + data.email + '/' + data.code;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Falló la verificación del código',
          confirmButtonColor: '#dc3545'
        });
        return;
      } else if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Tú correo se ha verificado corectamente',
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