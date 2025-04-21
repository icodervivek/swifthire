import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutHome from "./components/AboutHome";
import HowWeWork from "./components/HowWeWork";
import ActionBar from "./components/ActionBar";
import Footer from "./components/Footer";
// import AnimatedCursor from "react-animated-cursor";

const App = () => {
  return (
    <>
      {/* <AnimatedCursor /> */}
      <Navbar />
      <HeroSection />
      <AboutHome />
      <HowWeWork />
      <ActionBar />
      <Footer />
    </>
  );
};

export default App;
