import React from "react";
import Hero from "./components/hero";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div>
      <div className="mt-36 lg:mt-40 bg-[#F6F7F9]  ">
      <Navbar/>


        <Hero />
      </div>
    </div>
  );
};

export default Home;
