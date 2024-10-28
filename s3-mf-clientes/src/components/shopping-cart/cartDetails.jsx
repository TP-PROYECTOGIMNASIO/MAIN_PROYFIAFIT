import { useShoppingCart } from "../../hooks";
import { useEffect, useState } from "react";

const CartDetails = () => {
  const { products, totalAmount, removeProduct, addProduct } = useShoppingCart();
  const [setCulqiLoaded] = useState(false); // Corrección aquí

  // Función para redirigir a aa.html con parámetros
  const redirectToPage = (cart) => {
    const totalPrice = cart.price.toFixed(2);
    
    // Verifica que cada producto tenga un `product_id` y `quantity`. Si no, lanza un error.
    const productIds = cart.products.map(product => {
      if (!product.product_id) {
        throw new Error(`El producto ${product.name || 'sin nombre'} no tiene un ID definido.`);
      }
      return product.product_id;
    }).join(',');

    const quantities = cart.products.map(product => {
      if (typeof product.quantity === 'undefined' || product.quantity <= 0) {
        throw new Error(`El producto ${product.name || 'sin nombre'} tiene una cantidad no válida.`);
      }
      return product.quantity;
    }).join(',');

    // Construye la URL correctamente
    const url = `/aa.html?price=${totalPrice}&item.id=${productIds}&quantity=${quantities}`;
    window.location.href = url;
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeProduct(productId);
    } else {
      const productToUpdate = products.find(
        (product) => product.product_id === productId
      );
      if (productToUpdate) {
        addProduct(productToUpdate, quantity - productToUpdate.quantity);
      }
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.culqi.com/js/v4';
    script.async = true;

    script.onload = () => {
      if (window.Culqi) {
        window.Culqi.publicKey = 'pk_test_1e3464ded7850f8c';
        setCulqiLoaded(true);  // Corrección aquí
      } else {
        console.error("Culqi no está definido después de cargar el script.");
      }
    };

    script.onerror = () => {
      console.error('Error al cargar el script de Culqi');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-3/5 p-5">
            {products.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              products.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between items-center mt-6 pt-6 border-t"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="rounded-full w-12 h-12 object-cover"
                    />
                    <div className="flex flex-col ml-3">
                      <span
                        className="md:text-md font-medium"
                        style={{ color: "#D50000" }}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs font-light text-gray-400">
                        {item.weight}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="pr-8 flex">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                        className="font-semibold"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="focus:outline-none bg-gray-100 h-6 w-10 rounded text-sm px-2 mx-2"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                        className="font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <div className="pr-8">
                      <span className="text-xs font-medium">
                        S/. {item.price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => removeProduct(item.product_id)}
                        className="text-red-500 text-xs font-bold"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="md:w-2/5 bg-gray-200 p-5">
            <div className="p-5">
              <h3 className="text-xl font-bold border-b pb-2">Resumen</h3>
              <div className="flex justify-between mt-4">
                <span>Subtotal:</span>
                <span>S/. {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Total:</span>
                <span>S/. {totalAmount.toFixed(2)}</span>
              </div>

              {/* Botón de pago único para todos los productos */}
              <button
                onClick={() => redirectToPage({ price: totalAmount, products })}
                className="w-full py-3 mt-6 bg-red-600 hover:bg-red-700 rounded text-white text-xs font-semibold"
              >
                PAGAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;