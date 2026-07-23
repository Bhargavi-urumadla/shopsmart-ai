import "./Header.css";
import {
  FiBell,
  FiSearch,
  FiSettings,
} from "react-icons/fi";

function Header() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="dashboard-header">

      <div className="header-left">
        <h2>Dashboard</h2>
      </div>

      <div className="header-search">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products..."
        />

      </div>

      <div className="header-right">

        <button className="icon-btn">
          <FiBell />
        </button>

        <button className="icon-btn">
          <FiSettings />
        </button>

        <div className="header-user">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <span className="hello">
              Welcome
            </span>

            <h4>
              {user?.name}
            </h4>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;