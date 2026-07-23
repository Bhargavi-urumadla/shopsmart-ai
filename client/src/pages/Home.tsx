import { useEffect, useState } from "react";
import API from "../api/api";
import { notify } from "../utils/notify";
import "./Home.css";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import AISection from "../components/home/AISection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/home/Footer";
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Home() {
  const [, setProducts] = useState<Product[]>([]);
  const [, setLoading] = useState(true);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      // Show only first 4 products
      setProducts(res.data.data.slice(0, 4));
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load featured products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  
<Hero />
<Stats />
<FeaturedProducts />
<Categories />
<AISection />
<WhyChooseUs />
<Testimonials />
<Newsletter />
<Footer />
{/* 
      AI Tip

        <section className="ai-box">

          <h2>💡 AI Shopping Tip</h2>

          <p>
            Compare products before purchasing.
            Save favourites in your wishlist and
            place orders with confidence.
          </p>

        </section> */}

    </>
  );
}

export default Home;