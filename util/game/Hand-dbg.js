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

    /**
     * Checks if any card in the hand can beat the given card
     */
    canBeatCard(card) {
      return this.getLegalCards(card.suit).some(c => c.beats(card));
    }
    getLowestLegalCard(leadingsuit) {
      const possibleCards = this.getLegalCards(leadingsuit);
      return this.getLowestFromCards(possibleCards);
    }
    getHighestLegalCard(leadingsuit) {
      const possibleCards = this.getLegalCards(leadingsuit);
      return this.getHighestfromCards(possibleCards);
    }
    getWinningCards(leadingCard) {
      return this.cards.filter(card => card.beats(leadingCard));
    }
    getLowestWinningCard(leadingCard) {
      return this.getLowestFromCards(this.getWinningCards(leadingCard));
    }
    getRandomLegalCard(leadingsuit) {
      const possibleCards = this.getLegalCards(leadingsuit);
      return possibleCards[Math.floor(Math.random() * possibleCards.length)];
    }
    getLowestFromCards(cards) {
      return cards.reduce((lowestCard, currentCard) => {
        if (currentCard.getNumericValue() < lowestCard.getNumericValue()) {
          return currentCard;
        }
        return lowestCard;
      });
    }
    getHighestfromCards(cards) {
      return cards.reduce((highestCard, currentCard) => {
        if (currentCard.getNumericValue() > highestCard.getNumericValue()) {
          return currentCard;
        }
        return highestCard;
      });
    }
  }
  return Hand;
});