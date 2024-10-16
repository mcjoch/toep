"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "./BaseController", "../util/game/SimulationGame"], function (JSONModel, __BaseController, __SimulationGame) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const SimulationGame = _interopRequireDefault(__SimulationGame);
  /**
   * @namespace com.game.toep.controller
   */
  const Simulation = BaseController.extend("com.game.toep.controller.Simulation", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.aiWins = [];
      this.onRouteMatched = () => {
        // Pass the level config to the Game Manager
        const simulationConfig = this.getSimulationConfig();
        const viewModel = this.getModel("viewModel");

        // Set the win count for each AI to 0
        simulationConfig.AIs.forEach(aiConfig => {
          this.aiWins.push({
            key: aiConfig.key,
            name: aiConfig.name,
            wins: 0
          });
        });
        viewModel.setProperty("/aiWins", this.aiWins);

        // Run the simulation game 10 times
        this.runGames().then(() => {
          this.calculateWinPercentages();
          viewModel.setProperty("/simulating", false);
          viewModel.setProperty("/aiWins", this.aiWins);
          console.log(this.aiWins);
        }).catch(error => {
          console.error(error);
        });
      };
      this.setupSimulationGame = simulationConfig => {
        const gameObject = new SimulationGame();
        gameObject.setup(simulationConfig);
        return gameObject;
      };
    },
    onInit: function _onInit() {
      this.getRouter().getRoute("simulation").attachPatternMatched(this.onRouteMatched, this);
      const viewModel = new JSONModel({
        completedRuns: 0,
        targetRuns: 1000,
        simulating: true,
        aiWins: []
      });
      this.setModel(viewModel, "viewModel");
    },
    calculateWinPercentages: function _calculateWinPercentages() {
      const totalWins = this.aiWins.reduce((acc, ai) => acc + ai.wins, 0);
      this.aiWins.forEach(ai => {
        const percentage = ai.wins / totalWins * 100;
        // Round to two decimals
        ai.percentage = Math.round(percentage * 100) / 100;
      });
    },
    updateWinCount: function _updateWinCount(winner) {
      this.aiWins[winner - 1].wins++;
    },
    runGames: async function _runGames() {
      const viewModel = this.getModel("viewModel");

      // Run the simulation game 10 times
      for (let i = 0; i < 1000; i++) {
        // Pass the level config to the Game Manager
        const simulationConfig = this.getSimulationConfig();

        // Create a new simGame
        const simGame = this.setupSimulationGame(simulationConfig);

        // Start the simGame
        const winner = await simGame.startGame();
        this.updateWinCount(winner.id);
        viewModel.setProperty("/completedRuns", i + 1);
      }
    },
    getSimulationConfig: function _getSimulationConfig() {
      return {
        "key": 1,
        "title": "Simulation",
        "subtitle": "",
        "minimumBet": 0,
        "minimumToPlay": 0,
        "AIDescription": "",
        AIs: [{
          key: 1,
          name: "Random AI 1",
          AI: "RandomAI"
        }, {
          key: 2,
          name: "Random AI 2",
          AI: "RandomAI"
        }, {
          key: 3,
          name: "Feeble Mind AI",
          AI: "FeebleMindAI"
        }, {
          key: 4,
          name: "Reasoning AI",
          AI: "ReasoningAI"
        }]
      };
    }
  });
  return Simulation;
});