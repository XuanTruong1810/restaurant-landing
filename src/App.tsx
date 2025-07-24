import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
// import MenuHighlights from "./components/MenuHighlights";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Specials from "./components/Specials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Hero />
        <About />
        {/* <MenuHighlights /> */}
        <Gallery />
        <Testimonials />
        <Specials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
