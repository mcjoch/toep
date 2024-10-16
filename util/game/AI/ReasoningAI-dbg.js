"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.util.game.AI
   */
  class ReasoningAI {
    constructor(player) {
      this.player = player;
    }
    pickCardToPlay(trick) {
      // If we start the round, play the lowest card on rounds 1 and 2, and the highest card on rounds 3 and 4
      if (!trick.hasLeadingCard()) {
        if (trick.no === 1 || trick.no === 2) {
          return this.player.hand.getLowestLegalCard(null);
        } else {
          return this.player.hand.getHighestLegalCard(null);
        }
      }

      // If we cannot beat the leading card, play the lowest card
      if (!this.player.hand.canBeatCard(trick.getLeadingCard())) {
        return this.player.hand.getLowestLegalCard(trick.getLeadingSuit());
        // If we can beat the leading card, play the lowest winning card
      } else {
        return this.player.hand.getLowestWinningCard(trick.getLeadingCard());
      }
    }
  }
  return ReasoningAI;
});