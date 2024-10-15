"use strict";

sap.ui.define(["./AI/RandomAI", "./BasePlayer"], function (__RandomAI, __BasePlayer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const RandomAI = _interopRequireDefault(__RandomAI);
  const BasePlayer = _interopRequireDefault(__BasePlayer);
  /**
   * @namespace com.game.toep.util.game
   */
  const AIPlayer = BasePlayer.extend("com.game.toep.util.game.AIPlayer", {
    constructor: function _constructor(id, playerName) {
      BasePlayer.prototype.constructor.call(this, id, playerName);

      // Replace with dynamic AI choice
      this.AI = new RandomAI(this);
    },
    pickCardToPlay: function _pickCardToPlay(trick) {
      return new Promise((resolve, reject) => {
        // Pick the first card for now
        const card = this.AI.pickCardToPlay(trick);

        // Feign AI delay
        this.think(1500, 2500).then(() => {
          // Remove the card from your hand
          this.hand.removeCard(card);

          // Resolve the chosen card back to the game
          resolve(card);
        }).catch(error => {
          reject(error);
        });
      });
    }
  });
  return AIPlayer;
});