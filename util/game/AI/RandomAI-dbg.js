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
      // Pick a random card
      return this.player.hand.getRandomLegalCard(trick.getLeadingSuit());
    }
  }
  return RandomAI;
});