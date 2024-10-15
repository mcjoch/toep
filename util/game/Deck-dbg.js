"use strict";

sap.ui.define(["./Card"], function (__Card) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Card = _interopRequireDefault(__Card);
  /**
   * @namespace com.game.toep.util.game
   */
  class Deck {
    constructor() {
      this.cards = [];
      const suits = ["spades", "diamonds", "clubs", "hearts"];
      const values = ["J", "Q", "K", "A", "7", "8", "9", "10"];
      for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
          const card = new Card(values[x], suits[i]);
          this.cards.push(card);
        }
      }
    }

    /**
     * Uses a Fisher Yates shuffle method
     */
    shuffle() {
      let i = this.cards.length,
        j,
        temp;
      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = temp;
      }
    }
    takeCard() {
      // Take a card and remove it from the Deck
      return this.cards.pop();
    }
  }
  return Deck;
});