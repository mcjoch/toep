"use strict";

sap.ui.define(["sap/ui/core/Control", "./CardControlRenderer"], function (Control, __CardControlRenderer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const CardControlRenderer = _interopRequireDefault(__CardControlRenderer);
  /**
   * @namespace com.game.toep.controls
   */
  const CardControl = Control.extend("com.game.toep.controls.CardControl", {
    renderer: CardControlRenderer,
    metadata: {
      properties: {
        value: {
          type: "string"
        },
        suit: {
          type: "string"
        },
        winner: {
          type: "boolean",
          defaultValue: false
        },
        active: {
          type: "boolean",
          defaultValue: true
        }
      },
      events: {
        "select": {}
      },
      dnd: {
        draggable: true,
        droppable: false
      }
    },
    onclick: function _onclick() {
      this.fireEvent("select");
    },
    getSymbol: function _getSymbol() {
      switch (this.getProperty("suit")) {
        case "hearts":
          return "♥";
        case "clubs":
          return "♣";
        case "diamonds":
          return "♦";
        case "spades":
          return "♠";
      }
    },
    getColor: function _getColor() {
      switch (this.getProperty("suit")) {
        case "hearts":
        case "diamonds":
          return "red";
        case "clubs":
        case "spades":
          return "black";
      }
    },
    getSuit: function _getSuit() {
      return this.getProperty("suit");
    },
    getValue: function _getValue() {
      return this.getProperty("value");
    },
    getActive: function _getActive() {
      return this.getProperty("active");
    },
    getWinner: function _getWinner() {
      return this.getProperty("winner");
    }
  });
  return CardControl;
});