import Navbar from "../components/layout/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>Welcome 👋 {user?.name}</h1>

        <p>What would you like to do today?</p>

        <div className="dashboard-grid">

          <div className="card">
            📦
            <h3>Products</h3>
            <p>Browse all products</p>
          </div>

          <div className="card">
            ❤️
            <h3>Wishlist</h3>
            <p>Your saved products</p>
          </div>

          <div className="card">
            🛒
            <h3>Cart</h3>
            <p>Items ready to buy</p>
          </div>

          <div className="card">
            📋
            <h3>Orders</h3>
            <p>Track your orders</p>
          </div>

          <div className="card ai">
            🤖
            <h3>AI Shopping Assistant</h3>
            <p>Ask AI to compare products</p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;