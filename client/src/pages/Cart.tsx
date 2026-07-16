import { useEffect, useState } from "react";
import API from "../api/api";
import "./Cart.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    try {
      await API.put(
        `/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const removeCart = async (id: string) => {
    try {
      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <h2 className="loading">Loading Cart...</h2>;
  }

  return (
    <div className="cart-container">

      <h1 className="cart-title">
        🛒 My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="empty-cart">

          <h2>Your Cart is Empty</h2>

          <p>Add products to start shopping.</p>

        </div>
      ) : (
        <div className="cart-layout">

          {/* Left Side */}

          <div className="cart-items">

            {cart.map((item) => (

              <div className="cart-item" key={item._id}>

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="item-details">

                  <h2>{item.product.name}</h2>

                  <p>{item.product.category}</p>

                  <p className="description">
                    {item.product.description}
                  </p>

                  <h3>₹ {item.product.price}</h3>

                </div>

                <div className="item-actions">

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeCart(item._id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Right Side */}

          <div className="summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Cart;