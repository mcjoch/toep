"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game
   */

  class Hand {
    constructor() {
      this.cards = [];
    }
    addCard(card) {
      this.cards.push(card);
    }
    removeCard(card) {
      this.cards = this.cards.filter(c => c !== card);
    }
    getLegalCards(leadingsuit) {
      const cardsOfLeadingSuit = this.cards.filter(card => card.suit === leadingsuit);
      if (cardsOfLeadingSuit.length > 0) {
        return cardsOfLeadingSuit;
      }
      return this.cards;
    }
    markLegalCards(leadingsuit) {
      this.cards.forEach(card => {
        card.active = this.getLegalCards(leadingsuit).includes(card);
      });
    }
    disableAllCards() {
      this.cards.forEach(card => {
        card.active = false;
      });
    }
  }
  return Hand;
});