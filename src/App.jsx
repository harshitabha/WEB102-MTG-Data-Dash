import { useState, useEffect, useRef } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import StatsBlock from "./components/StatsBlock";

const App = () => {
  const [cardsInfo, setCards] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    power: 0,
    tough: 0,
  });
  const originalCards = useRef(null);

  useEffect(() => {
    const getNewCards = async () => {
      const apiURL = "https://api.magicthegathering.io/v1/cards?limit=25";
      const response = await fetch(apiURL);
      const json = await response.json();
      const cards = json.cards;
      // update the cards json
      setCards(prevJson => ({
        ...prevJson,
        cards
      }));
      originalCards.current = cards; // save this to be used during filters
    }
    getNewCards().catch(console.error);
  }, [])

  const calcCards = (type) => {
    let total = 0;
    if (cardsInfo) {
      for(let t = 0; t < cardsInfo.cards.length; t++) {
        if (cardsInfo.cards[t].type.indexOf(type) != -1) total++;
      }
    }
    return total;
  }

  const handleSearch = (e) => {
    setFilter((prevState) => ({
      ...prevState,
      search: e.target.value.trim().toLowerCase(),
    }));
    const filterSearch = filter.search.length !== 0 ? 
      originalCards.current.filter((card) => card.name.toLowerCase().indexOf(filter.search) !== -1) :
      originalCards.current;
      setCards((prevJson) => ({
        ...prevJson,
        cards: filterSearch
      }))
  }


  return (
    <>
      <Header 
        change={handleSearch}
        searchVal={filter.search}/>

      <div className="stats-container">
        <StatsBlock 
          type="Total Cards"
          info={cardsInfo ? cardsInfo.cards.length : 0}/>
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
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.name): null}
          keyInfo="name"/>
        <Section 
          header="Mana Cost"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.manaCost): null}
          keyInfo="mc"/>
        <Section 
          header="Type"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.type): null}
          keyInfo="type"/>
        <Section 
          header="Power"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.power): null}
          keyInfo="power"/>
        <Section 
          header="Toughness"
          content={cardsInfo ? cardsInfo.cards.map((cards) => cards.toughness): null}
          keyInfo="tough"/>
      </div>
    </>
  );
}

export default App;