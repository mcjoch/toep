"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game.AI
   */
  class FeebleMindAI {
    constructor(player) {
      this.player = player;
    }
    pickCardToPlay(trick) {
      // If we cannot beat the leading card, play the lowest card
      if (trick.hasLeadingCard() && !this.player.hand.canBeatCard(trick.getLeadingCard())) {
        return this.player.hand.getLowestLegalCard(trick.getLeadingSuit());
      }

      // Otherwise, pick a random card
      return this.player.hand.getRandomLegalCard(trick.getLeadingSuit());
    }
  }
  return FeebleMindAI;
});