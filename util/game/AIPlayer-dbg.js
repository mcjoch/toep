"use strict";

sap.ui.define(["./AI/CardCounterAI", "./AI/FeebleMindAI", "./AI/RandomAI", "./AI/ReasoningAI", "./BasePlayer"], function (__CardCounterAI, __FeebleMindAI, __RandomAI, __ReasoningAI, __BasePlayer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const CardCounterAI = _interopRequireDefault(__CardCounterAI);
  const FeebleMindAI = _interopRequireDefault(__FeebleMindAI);
  const RandomAI = _interopRequireDefault(__RandomAI);
  const ReasoningAI = _interopRequireDefault(__ReasoningAI);
  const BasePlayer = _interopRequireDefault(__BasePlayer);
  /**
   * @namespace com.game.toep.util.game
   */
  const AIPlayer = BasePlayer.extend("com.game.toep.util.game.AIPlayer", {
    constructor: function _constructor(config) {
      BasePlayer.prototype.constructor.call(this, config.key, config.name);

      // Set the AI to be used
      switch (config.AI) {
        case "RandomAI":
          this.AI = new RandomAI(this);
          break;
        case "FeebleMindAI":
          this.AI = new FeebleMindAI(this);
          break;
        case "ReasoningAI":
          this.AI = new ReasoningAI(this);
          break;
        case "CardCounterAI":
          this.AI = new CardCounterAI(this);
          break;
        default:
          throw new Error(`Invalid AI choice: ${config.AI}`);
      }
    },
    pickCardToPlay: function _pickCardToPlay(trick) {
      return new Promise((resolve, reject) => {
        // Pick the first card for now
        const card = this.AI.pickCardToPlay(trick);
        if (!card) {
          reject(new Error("No card was chosen"));
        }

        // No delay in simulation games
        if (trick.game.isSimulation()) {
          // Remove the card from your hand
          this.hand.removeCard(card);

          // Resolve the chosen card back to the game
          resolve(card);
          return;
        }

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