import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";

const App = () => {
  const [cardsInfo, setCards] = useState({
    name: [],
    manaCost: [],
    type: [],
    power: [],
    toughness: []
  });

  useEffect(() => {
    const getNewCards = async () => {
      const apiURL = "https://api.magicthegathering.io/v1/cards?limit=25";
      const response = await fetch(apiURL);
      const json = await response.json();
      // update the cards json
      setCards(prevJson => ({
        ...prevJson,
        name: json.cards.slice(0, 25).map((cards) => cards.name),
        manaCost: json.cards.slice(0, 25).map((cards) => cards.manaCost),
        type: json.cards.slice(0, 25).map((cards) => cards.type),
        power: json.cards.slice(0, 25).map((cards) => cards.power),
        toughness: json.cards.slice(0, 25).map((cards) => cards.toughness)
      }));
    }
    getNewCards().catch(console.error);
  }, [])

  return (
    <>
      <Header />

      <div className="main-body">
        <Section 
          header="Name"
          content={cardsInfo.name}/>
        <Section 
          header="Mana Cost"
          content={cardsInfo.manaCost}/>
        <Section 
          header="Type"
          content={cardsInfo.type}/>
        <Section 
          header="Power"
          content={cardsInfo.power}/>
        <Section 
          header="Toughness"
          content={cardsInfo.toughness}/>
      </div>
    </>
  );
}

export default App;