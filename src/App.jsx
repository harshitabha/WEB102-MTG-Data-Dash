import { useState, useEffect, useRef } from "react";

import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import StatsBlock from "./components/StatsBlock";
import BubbleSelect from "./components/BubbleSelect";

const App = () => {
  const [cardsInfo, setCards] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    cardType: 'All',
    power: 0,
    tough: 0,
  });

  const originalCards = useRef(null);

  const bubbleOptions = ["Any", "1", "2", "3", "4", "5+"];

  useEffect(() => {
    getNewCards().catch(console.error);
  }, [])

  const getNewCards = async () => {
    const apiURL = "https://api.magicthegathering.io/v1/cards?pageSize=50&random=true";
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

  const calcCards = (type) => {
    let total = 0;
    if (cardsInfo) {
      for(let t = 0; t < cardsInfo.cards.length; t++) {
        if (cardsInfo.cards[t].type.indexOf(type) != -1) total++;
      }
    }
    return total;
  }

  const handleFilterChange = (e) => {
    if (e.target.name === "selectType") {
      setFilter((prevState) => ({
        ...prevState,
        cardType: e.target.value,
      }));
    } else if (e.target.name === 'search') {
      setFilter((prevState) => ({
        ...prevState,
        search: e.target.value.trim().toLowerCase(),
      }));
    } else {
      // update the active index if a select filter was clicked
      const name = e.target.name;
      const start = name.indexOf("-") + 1;
      const end = name.indexOf("-", start);
      const type = name.substring(start, end);
      setFilter((prevState) => ({
        ...prevState,
        [type]: name.slice(-1),
      }));
    }

    updateCardsDisplay();
  }
  const updateCardsDisplay = () => {
    // apply search filter
    let filterSearch = filter.search.length !== 0 ? 
      originalCards.current.filter((card) => 
      card.name.toLowerCase().indexOf(filter.search) !== -1) :
      originalCards.current;

    // apply type filter
    filterSearch = filter.cardType.toLowerCase() !== "all" ? filterSearch.filter((card) => 
      card.type.toLowerCase().indexOf(filter.cardType) !== -1) : filterSearch;

    // apply power filter
    // (card.power >= filter.power || card.power === null) &&
    //   card.toughness >= filter.tough || card.toughness === null)

    // apply toughness filter
    
    setCards((prevJson) => ({
      ...prevJson,
      cards: filterSearch
    }))

  }

  return (
    <>
      <Header 
        change={handleFilterChange}
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

      <div className="filter-container dash-elem">
        <div className="select-container filter">
          <label htmlFor="selectType" className="filter-label">Card Type</label>
          <br />
          <select name="selectType" id="selectType" onChange={(e) => {handleFilterChange(e)}}>
            <option defaultValue={"all"} className="select-option">All</option>
            <option value="creature" className="select-option">Creature</option>
            <option value="sorcery" className="select-option">Sorcery</option>
            <option value="echantment" className="select-option">Enchantment</option>
          </select>
        </div>
        
        <BubbleSelect 
          label="Minimum Power"
          options={bubbleOptions}
          type="power"
          active={filter.power}
          handleClick={handleFilterChange}
          classes="filter"/>
        
        <BubbleSelect 
          label="Minimum Toughness"
          options={bubbleOptions}
          type="tough"
          active={filter.tough}
          handleClick={handleFilterChange}
          classes="filter"/>
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