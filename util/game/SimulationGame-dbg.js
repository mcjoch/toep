"use strict";

sap.ui.define(["./Game"], function (__Game) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Game = _interopRequireDefault(__Game);
  class SimulationGame extends Game {
    constructor() {
      super(null);
    }

    // In the simulation games we have no visualizations, and no ViewModel to refresh
    refreshViewModel() {
      return;
    }
  }
  return SimulationGame;
});