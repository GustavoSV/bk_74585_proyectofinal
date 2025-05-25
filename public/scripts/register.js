document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById('submit-button');
  const usernameInput = document.getElementById('reg-username');
  const passwordInput = document.getElementById('reg-password');
  const emailInput = document.getElementById('reg-email');
  const cityInput = document.getElementById('reg-city');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: usernameInput.value,
        city: cityInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
      const response = await fetch('/api/auth/register', options);
      const result = await response.json();
      
      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Error al registrar el usuario',
          confirmButtonColor: '#dc3545'
        });
        return;
      } else if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Felicitaciones!',
          text: 'Usuario registrado correctamente',
          confirmButtonColor: '#28a745',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((result) => {
          window.location.href = '/login';
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