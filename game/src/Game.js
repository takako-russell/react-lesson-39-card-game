import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const API_URL = "https://deckofcardsapi.com/api/deck";

function Game() {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function getNewDeck() {
      const res = await axios.get(`${API_URL}/new/shuffle/`);
      setDeck(res.data);
    }
    getNewDeck();
  }, []);

  async function drawCard() {
    try {
      const res = await axios.get(`${API_URL}/${deck.deck_id}/draw/`);
      const drawnCard = res.data.cards[0];
      if (res.data.remaining === 0)
        throw new Error("Error: no cards remaining!!");

      setCard({
        id: drawnCard.code,
        name: drawnCard.suit + "-" + card.value,
        img: drawnCard.image,
      });
    } catch (err) {
      alert(err);
    }
  }

  async function shuffle() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_URL}/${deck.deck_id}/shuffle/`);
      setCard({});
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  return (
    <div>
      <Card name={card.name} img={card.img} />
      <button onClick={drawCard}>Draw card</button>
      {isShuffling ? (
        <p>Shuffling the deck...</p>
      ) : (
        <button onClick={shuffle}>Shuffle Deck</button>
      )}
    </div>
  );
}

export default Game;
