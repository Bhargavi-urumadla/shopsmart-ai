import { useEffect, useState } from "react";
import "./Checkout.css";
import API from "../../api/api";
import { notify } from "../../utils/notify";
import ShippingAddress from "../../components/Checkout/ShippingAddress";
import PaymentMethod from "../../components/Checkout/PaymentMethod";
import { placeOrder } from "../../services/orderService";

import { useNavigate } from "react-router-dom";
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}
function Checkout() {
    const navigate = useNavigate();

const [placingOrder, setPlacingOrder] =
  useState(false);
    const [paymentMethod, setPaymentMethod] =
  useState("COD");
    const [cart, setCart] = useState<CartItem[]>([]);
const [, setLoading] = useState(true);

const [errors, setErrors] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
});
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; 
const validateForm = () => {
  const newErrors = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  };
  

  let isValid = true;

  if (!shippingAddress.fullName.trim()) {
    newErrors.fullName = "Full Name is required";
    isValid = false;
  }

  if (!shippingAddress.phone.trim()) {
    newErrors.phone = "Phone Number is required";
    isValid = false;
  } else if (!/^[6-9]\d{9}$/.test(shippingAddress.phone)) {
    newErrors.phone = "Enter a valid 10-digit phone number";
    isValid = false;
  }

  if (!shippingAddress.address.trim()) {
    newErrors.address = "Address is required";
    isValid = false;
  }

  if (!shippingAddress.city.trim()) {
    newErrors.city = "City is required";
    isValid = false;
  }

  if (!shippingAddress.state.trim()) {
    newErrors.state = "State is required";
    isValid = false;
  }

  if (!shippingAddress.pincode.trim()) {
    newErrors.pincode = "Pincode is required";
    isValid = false;
  } else if (!/^\d{6}$/.test(shippingAddress.pincode)) {
    newErrors.pincode = "Pincode must be 6 digits";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

  const handlePlaceOrder = async () => { 

    if (!validateForm()) {
    notify.error("Please fix the highlighted fields.");
    return;
  }

      console.log(shippingAddress); 
  if (
    !shippingAddress.fullName ||
    !shippingAddress.phone ||
    !shippingAddress.address ||
    !shippingAddress.city ||
    !shippingAddress.state ||
    !shippingAddress.pincode
  ) {
    notify.error("Please fill all shipping details.");
    return;
  }

  try {
    setPlacingOrder(true);

    const data = await placeOrder(
      shippingAddress,
      paymentMethod
    );

    notify.success(data.message);

    navigate("/order-success");
  } catch (error: any) {
    notify.error(
      error?.response?.data?.message ||
        "Failed to place order."
    );
  } finally {
    setPlacingOrder(false);
  }
};
const fetchCart = async () => {
  try {
    setLoading(true);

    const res = await API.get("/cart");

    setCart(res.data.cart || []);
  } catch (error) {
    console.error(error);
    notify.error("Failed to load cart.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchCart();
}, []);
  return (
    
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
<div className="checkout-left">
  <ShippingAddress
  shippingAddress={shippingAddress}
  onChange={handleChange}
  errors={errors}
/>

  <PaymentMethod
    paymentMethod={paymentMethod}
    setPaymentMethod={setPaymentMethod}
  />
</div>

        <div className="checkout-right">

  <div className="placeholder-card">

    <h2>Order Summary</h2>

    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        {cart.map((item) => (
          <div
            key={item._id}
            className="checkout-item"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="checkout-item-image"
            />

            <div className="checkout-item-info">
              <h4>{item.product.name}</h4>

              <p>Qty: {item.quantity}</p>

              <p>
                ₹ {item.product.price * item.quantity}
              </p>
            </div>
          </div>
        ))}

        <hr />

        <div className="summary-total">
          <span>Total</span>

          <strong>
            ₹{" "}
            {cart.reduce(
              (sum, item) =>
                sum +
                item.product.price * item.quantity,
              0
            )}
          </strong>
        </div>
        <button
  className="place-order-btn"
  onClick={handlePlaceOrder}
  disabled={placingOrder}
>
  {placingOrder
    ? "Placing Order..."
    : "Place Order"}
</button>
      </>
    )}

  </div>

</div>
      </div>
    </div>
  );
}

export default Checkout;