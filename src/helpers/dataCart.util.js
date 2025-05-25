export async function prepareCart(itemsCart) {
  const cartItems = [];

  for (let item of itemsCart) {
    const pdt = item.product_id;
    
    const quantity = item.quantity;

    cartItems.push({
      product: {
        _id: pdt._id.toString(),
        title: pdt.title,
        price: pdt.price,
        stock: pdt.stock,
        thumbnails: pdt.thumbnails || ["https://cdn-icons-png.flaticon.com/512/266/266033.png "],
        isAvailable: pdt.stock > 0
      },
      quantity,
      totalPrice: pdt.price * quantity
    });
  }

  const totalPrice = cartItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return {
    cartItems,
    totalPrice,
    totalQuantity,
    isCartEmpty: cartItems.length === 0
  };
}