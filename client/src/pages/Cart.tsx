import { useEffect, useState } from "react";
import API from "../api/api";
import "./Cart.css";
import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";
import EmptyState from "../components/EmptyState/EmptyState";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Page-level loading
  const [loading, setLoading] = useState(true);

  // Track which cart item quantity is updating
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Track which cart item is being removed
  const [removingId, setRemovingId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // Fetch Cart
  // =========================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(
  Array.isArray(res.data.cart)
    ? res.data.cart
    : []
);
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load your cart. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Update Quantity
  // =========================

  const updateQuantity = async (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    // Prevent multiple updates on the same item
    if (updatingId === id) return;

    try {
      setUpdatingId(id);

      await API.put(
        `/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update quantity directly in React state
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to update quantity. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // Remove Cart Item
  // =========================

  const removeCart = async (id: string) => {
    if (removingId) return;

    try {
      setRemovingId(id);

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove item directly from UI
      setCart((prevCart) =>
        prevCart.filter(
          (item) => item._id !== id
        )
      );

      notify.success(
        "Item removed from cart."
      );
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to remove item. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // =========================
  // Calculate Total
  // =========================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );

  // =========================
  // Page Loader
  // =========================

  if (loading) {
    return (
      <Loader
        size="medium"
        text="Loading your cart..."
      />
    );
  }

  return (
    <div className="cart-container">

      <h1 className="cart-title">
        🛒 My Shopping Cart
      </h1>

     {cart.length === 0 ? (
  <EmptyState
    icon="🛒"
    title="Your Cart is Empty"
    message="Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love."
    buttonText="Start Shopping"
    buttonLink="/products"
  />
) : (

        <div className="cart-layout">

          {/* Cart Items */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item._id}
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="item-details">

                  <h2>
                    {item.product.name}
                  </h2>

                  <p>
                    {item.product.category}
                  </p>

                  <p className="description">
                    {item.product.description}
                  </p>

                  <h3>
  ₹ {item.product.price}
</h3>

<p className="item-subtotal">
  Subtotal: ₹ {item.product.price * item.quantity}
</p>

                </div>

                <div className="item-actions">

                  {/* Quantity Controls */}

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity - 1
                        )
                      }
                      disabled={
                        updatingId === item._id ||
                        item.quantity <= 1
                      }
                    >
                      -
                    </button>

                    {updatingId === item._id ? (
                      <Loader
                        size="small"
                        text=""
                      />
                    ) : (
                      <span>
                        {item.quantity}
                      </span>
                    )}

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        updatingId === item._id
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeCart(item._id)
                    }
                    disabled={
                      removingId === item._id
                    }
                  >
                    {removingId === item._id ? (
                      <Loader
                        size="small"
                        text="Removing..."
                      />
                    ) : (
                      "🗑 Remove"
                    )}
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}

          <div className="summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>Items</span>

              <span>
                {cart.reduce(
                  (sum, item) =>
                    sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-row total">

              <span>Total</span>

              <span>
                ₹ {total}
              </span>

            </div>

           <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;