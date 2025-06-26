document.addEventListener("DOMContentLoaded", async () => {
  const submitButton = document.getElementById('submit-button');
  const idInput = document.getElementById('change-id');
  const emailInput = document.getElementById('change-email');
  const passActualInput = document.getElementById('change-passw-actual');
  const passNuevo1Input = document.getElementById('change-passw-nuevo1');
  const passNuevo2Input = document.getElementById('change-passw-nuevo2');

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    if (passNuevo1Input.value !== passNuevo2Input.value) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas NO coinciden',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try {
      const data = {
        id: idInput.value,
        email: emailInput.value,
        passwordAct: passActualInput.value,
        passwordNew1: passNuevo1Input.value,
        passwordNew2: passNuevo2Input.value
      }
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }
      const response = await fetch('/api/auth/new-password', options);
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
          title: '¡Felicitaciones!',
          text: 'Se ha cambiado corectamente la contraseña',
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