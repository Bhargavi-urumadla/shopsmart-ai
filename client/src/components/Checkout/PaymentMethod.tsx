import "./PaymentMethod.css";
interface Props {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: Props) {
  const methods = [
    "COD",
    "UPI",
    "Card",
    "Net Banking",
  ];

  return (
    <div className="payment-card">
      <h2>Payment Method</h2>

      {methods.map((method) => (
        <label key={method} className="payment-option">
          <input
            type="radio"
            checked={paymentMethod === method}
            onChange={() => setPaymentMethod(method)}
          />
          {method}
        </label>
      ))}
    </div>
  );
}

export default PaymentMethod;