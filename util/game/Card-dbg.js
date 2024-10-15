"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game
   */

  class Card {
    constructor(value, suit) {
      this.value = value;
      this.suit = suit;
      this.active = false;
      this.winner = false;
    }
    getSuit() {
      return this.suit;
    }
    getValue() {
      return this.value;
    }
    getNumericValue() {
      return ['J', 'Q', 'K', 'A', '7', '8', '9', '10'].indexOf(this.value);
    }
    setPlayer(player) {
      this.player = player;
    }
    setWinner(bool) {
      this.winner = bool;
    }

    /**
     * Check if this card beats the given card
     */
    beats(card) {
      if (this.suit === card.suit) {
        return this.getNumericValue() > card.getNumericValue();
      } else {
        return false;
      }
    }
  }
  return Card;
});