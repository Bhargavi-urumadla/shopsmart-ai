import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";
function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />
      <HowItWorks />
       <Testimonials />

        <Footer />


    </>
  );
}

export default Home;