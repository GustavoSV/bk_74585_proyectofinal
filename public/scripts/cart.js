document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items-container");

  if (!cartContainer) return;

  // Capturar eventos de botones
  cartContainer.addEventListener("click", async (e) => {
    const target = e.target;
    const productId = target.dataset.id;

    if (!productId) return;

    const input = document.querySelector(`input[data-id="${productId}"]`);
    let quantity = parseInt(input.value);

    if (target.classList.contains("increase-qty")) {
      const max = parseInt(input.max);
      if (quantity < max) {
        quantity++;
        updateQuantity(productId, quantity);
      }
    }

    if (target.classList.contains("decrease-qty")) {
      if (quantity > 1) {
        quantity--;
        updateQuantity(productId, quantity);
      }
    }
  });

  async function updateQuantity(productId, quantity) {
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity })
      });

      const data = await res.json();

      if (data.success) {
        location.reload(); // O puedes hacer una actualización parcial si prefieres
      } else {
        Swal.fire('Error', 'No se pudo actualizar la cantidad.', 'error');
      }
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
      Swal.fire('Error', 'Hubo un problema al actualizar.', 'error');
    }
  }
});