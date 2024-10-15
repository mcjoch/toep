"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "./BaseController", "../util/game/Game", "sap/ui/core/Fragment", "../util/SoundManager"], function (JSONModel, __BaseController, __GameObject, Fragment, ___util_SoundManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const GameObject = _interopRequireDefault(__GameObject);
  const SoundManager = ___util_SoundManager["SoundManager"];
  /**
   * @namespace com.game.toep.controller
   */
  const Game = BaseController.extend("com.game.toep.controller.Game", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.onRouteMatched = event => {
        const args = event.getParameter("arguments");
        this.setupNewGame(args.level);
        SoundManager.playMusic("gameplay");
      };
      this.setupNewGame = level => {
        const gameObject = new GameObject(this);

        // Read the level configuration from the Settings Model
        const levelConfig = this.getConfig().getProperty("/levels/" + String(level - 1));

        // Pass the level config to the Game Manager
        gameObject.setup(levelConfig);
        const gameModel = this.getModel("game");
        gameModel.setProperty("/", gameObject);
      };
      this.onSelectCard = oEvent => {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext("game");
        const oCard = oBindingContext.getObject();
        const oGame = this.getModel("game").getProperty("/");
        oGame.humanPlayer?.cardPicked(oCard);
      };
      this.openWinnerDialog = async () => {
        this.endGameDialog ??= await Fragment.load({
          id: this.getView().getId(),
          name: "com.game.toep.view.EndGameDialog",
          controller: this
        });
        this.getView().addDependent(this.endGameDialog);
        this.endGameDialog.open();
      };
      this.onStartNewGame = () => {
        const oGame = this.getModel("game").getProperty("/");

        // Start a new game with the same level configuration
        this.setupNewGame(oGame.levelConfig.key);
        this.endGameDialog.close();
      };
      this.onExitGame = () => {
        this.getRouter().navTo("selectlevel");
        this.endGameDialog.close();
      };
    },
    onInit: function _onInit() {
      this.getRouter().getRoute("game").attachPatternMatched(this.onRouteMatched, this);
      const oGameModel = new JSONModel({});
      this.setModel(oGameModel, "game");
    },
    modelRefresh: function _modelRefresh() {
      this.getModel("game").refresh();
    }
  });
  return Game;
});