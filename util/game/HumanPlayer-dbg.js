"use strict";

sap.ui.define(["../StorageManager", "./BasePlayer"], function (___StorageManager, __BasePlayer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const StorageManager = ___StorageManager["StorageManager"];
  const BasePlayer = _interopRequireDefault(__BasePlayer);
  /**
   * @namespace com.game.toep.util.game
   */
  const HumanPlayer = BasePlayer.extend("com.game.toep.util.game.HumanPlayer", {
    constructor: function _constructor(id) {
      BasePlayer.prototype.constructor.call(this, id, StorageManager.getName());
    },
    pickCardToPlay: function _pickCardToPlay(trick) {
      this.currentTrick = trick;
      this.hand.markLegalCards(this.currentTrick.getLeadingSuit());
      return new Promise((resolve, reject) => {
        // Get the card from the user
        this.resolvePendingCardPick = resolve;
      });
    },
    cardPicked: function _cardPicked(card) {
      // Check if a card is being awaited
      if (!this.resolvePendingCardPick) {
        return;
      }
      const legalCards = this.hand.getLegalCards(this.currentTrick.getLeadingSuit());

      // If an illegal card was chosen, return
      if (!legalCards.includes(card)) {
        return;
      }

      // Remove the chosen card from our hand
      this.hand.removeCard(card);

      // disable the remaining cards
      this.hand.disableAllCards();

      // Resolve the chosen card to the game controller class
      this.resolvePendingCardPick(card);

      // Reset the promise
      this.resolvePendingCardPick = null;
    }
  });
  return HumanPlayer;
});