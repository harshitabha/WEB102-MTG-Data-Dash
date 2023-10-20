import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import StatsBlock from "./components/StatsBlock";

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
        name: json.cards.slice(0,25).map((cards) => cards.name),
        manaCost: json.cards.slice(0,25).map((cards) => cards.manaCost),
        type: json.cards.slice(0,25).map((cards) => cards.type),
        power: json.cards.slice(0,25).map((cards) => cards.power),
        toughness: json.cards.slice(0,25).map((cards) => cards.toughness)
      }));
    }
    getNewCards().catch(console.error);
  }, [])

  const calcCards = (type) => {
    let total = 0;
    const regEx = new RegExp(type, 'g');
    for(let t = 0; t < cardsInfo.type.length; t++) {
      if (cardsInfo.type[t].indexOf(type) != -1) total++;
    }
    return total;
  }

  return (
    <>
      <Header />

      <div className="stats-container">
        <StatsBlock 
          type="Total Cards"
          info={cardsInfo.name.length}/>
        <StatsBlock 
          type="Creatures"
          info={calcCards('Creature')}/>
        <StatsBlock 
          type="Sorceries"
          info={calcCards('Sorcery')}/>
        <StatsBlock 
          type="Enchantments"
          info={calcCards('Enchantment')}/>
      </div>

      <div className="fliter-container">
        
      </div>

      <div className="data-body dash-elem">
        <Section 
          header="Name"
          content={cardsInfo.name}
          keyInfo="name"/>
        <Section 
          header="Mana Cost"
          content={cardsInfo.manaCost}
          keyInfo="mc"/>
        <Section 
          header="Type"
          content={cardsInfo.type}
          keyInfo="type"/>
        <Section 
          header="Power"
          content={cardsInfo.power}
          keyInfo="power"/>
        <Section 
          header="Toughness"
          content={cardsInfo.toughness}
          keyInfo="tough"/>
      </div>
    </>
  );
}

export default App;