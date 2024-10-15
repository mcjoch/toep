"use strict";

sap.ui.define(["sap/ui/base/Object", "./Hand"], function (BaseObject, __Hand) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Hand = _interopRequireDefault(__Hand);
  /**
   * @namespace com.game.toep.util.game
   */
  const BasePlayer = BaseObject.extend("com.game.toep.util.game.BasePlayer", {
    constructor: function _constructor(id, playerName) {
      BaseObject.prototype.constructor.call(this);
      this.id = id;
      this.name = playerName;
      this.hand = new Hand();
      this.folded = false;
      this.winner = false;
    },
    // Getters and Setters
    getHand: function _getHand() {
      return this.hand;
    },
    hasFolded: function _hasFolded() {
      return this.folded;
    },
    // Utilitiy Functions
    dealCard: function _dealCard(card) {
      this.hand.addCard(card);

      // Store the owner on the card so we can track who played it
      card.setPlayer(this);
    },
    fold: function _fold() {
      this.folded = true;
    },
    think: function _think(min, max) {
      const ms = Math.floor(Math.random() * (max - min + 1) + min);
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    setWinner: function _setWinner(bool) {
      this.winner = bool;
    }
  });
  return BasePlayer;
});