document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById('submit-button');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      }
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
      const response = await fetch('/api/auth/login', options);
      const result = await response.json();
      
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Error al iniciar sesión',
          confirmButtonColor: '#dc3545'
        });
        return;
      } else if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Se ha logueado correctamente',
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