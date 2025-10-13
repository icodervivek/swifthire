import Navbar from "./components/Navbar";
import FirstSection from "./components/FirstSection";
import CollageSection from "./components/CollageSection";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import { useEffect } from "react";
import UploadResume from "./UploadResume";

const App = () => {
  useEffect(() => {
    document.title = "SwiftHire";
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar remains sticky or responsive */}
      <Navbar />

      {/* FirstSection full-width, responsive */}
      <div className="mt-8">
        <FirstSection />
      </div>

      {/* Other sections inside responsive container */}
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CollageSection />
          <HeroSection />
        </div>
      </div>

      {/* Footer responsive */}
      <Footer />
    </div>
  );
};

export default App;
