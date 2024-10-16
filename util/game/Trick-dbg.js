"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game
   */

  class Trick {
    constructor(no, game) {
      this.cardsPlayed = [];
      this.no = no;
      this.game = game;
    }
    addCard(card) {
      this.cardsPlayed.push(card);
    }
    getLeadingSuit() {
      if (this.cardsPlayed.length === 0) {
        return null;
      }
      return this.cardsPlayed[0].suit;
    }
    hasLeadingCard() {
      return this.cardsPlayed.length > 0;
    }
    getLeadingCard() {
      let winner = this.cardsPlayed[0];
      this.cardsPlayed.forEach(card => {
        if (card.beats(winner)) {
          winner = card;
        }
      });
      return winner;
    }
    getWinner() {
      return this.getLeadingCard().player;
    }

    /**
     * Mark the winning player and card
     */
    markWinner() {
      this.getLeadingCard().setWinner(true);
      this.getWinner().setWinner(true);
    }
  }
  return Trick;
});