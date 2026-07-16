import { useEffect, useState } from "react";
import API from "../api/api";
import "./Wishlist.css";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
}

function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id: string) => {
    try {
      await API.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Removed from Wishlist");

      fetchWishlist();

    } catch (error) {
      alert("Remove failed");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="wishlist-page">

      <h1>❤️ My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>No Products in Wishlist</h2>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div className="wishlist-card" key={item._id}>

              <img
                src={item.product.image}
                alt={item.product.name}
              />

              <h3>{item.product.name}</h3>

              <p className="price">₹ {item.product.price}</p>

              <p>{item.product.category}</p>

              <button
                className="remove-btn"
                onClick={() => removeWishlist(item._id)}
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;