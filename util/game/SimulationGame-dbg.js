"use strict";

sap.ui.define(["./AIPlayer", "./Game"], function (__AIPlayer, __Game) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const AIPlayer = _interopRequireDefault(__AIPlayer);
  const Game = _interopRequireDefault(__Game);
  class SimulationGame extends Game {
    constructor() {
      super(null);
      this.simulation = true;
      this.waitTime = 0;
    }

    // In the simulation games we have no visualizations, and no ViewModel to refresh
    refreshViewModel() {
      return;
    }

    /**
     * Setup the game
     */
    setup(levelConfig) {
      levelConfig.AIs.forEach(aiConfig => {
        this.players.push(new AIPlayer(aiConfig));
      });

      // Deal 4 cards to each player
      for (let i = 0; i < 4; i++) {
        this.players.forEach(player => {
          player.dealCard(this.deck.takeCard());
        });
      }
    }
  }
  return SimulationGame;
});