import Navbar from "./components/Navbar";
import FirstSection from "./components/FirstSection";
import CollageSection from "./components/CollageSection";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <FirstSection />
        <CollageSection />
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
};

export default App;
