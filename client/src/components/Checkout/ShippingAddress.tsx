import "./ShippingAddress.css";

interface ShippingAddressProps {
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  errors: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

function ShippingAddress({
  shippingAddress,
  onChange,
  errors,
}: ShippingAddressProps) {
  return (
    <div className="shipping-card">
      <h2>Shipping Address</h2>

      <div className="shipping-grid">
        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={onChange}
          />
          {errors.fullName && (
            <p className="error-text">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingAddress.phone}
            onChange={onChange}
          />
          {errors.phone && (
            <p className="error-text">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={onChange}
          />
          {errors.address && (
            <p className="error-text">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={onChange}
          />
          {errors.city && (
            <p className="error-text">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            onChange={onChange}
          />
          {errors.state && (
            <p className="error-text">{errors.state}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={shippingAddress.pincode}
            onChange={onChange}
          />
          {errors.pincode && (
            <p className="error-text">{errors.pincode}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;