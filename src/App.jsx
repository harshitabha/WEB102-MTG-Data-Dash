import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";

const App = () => {
  
  useEffect(() => {
    const getNewCard = () => {
      const apiURL = "https://api.magicthegathering.io/v1/cards?";
    }
  }, [])
  return (
    <>
      <Header />
    </>
  );
}

export default App;