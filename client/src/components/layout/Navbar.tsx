import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🛍 ShopSmart AI</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Features</li>
        <li>About</li>
        <li>Login</li>
        <li className="register-btn">Register</li>
      </ul>
    </nav>
  );
}

export default Navbar;