"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game.AI
   */
  class RandomAI {
    constructor(player) {
      this.player = player;
    }
    pickCardToPlay(trick) {
      // Get the card from the user
      const possibleCards = this.player.hand.getLegalCards(trick.getLeadingSuit());

      // Pick a random card
      const card = possibleCards[Math.floor(Math.random() * possibleCards.length)];
      return card;
    }
  }
  return RandomAI;
});