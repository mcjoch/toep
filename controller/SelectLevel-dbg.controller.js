"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "./BaseController", "../util/StorageManager", "../util/SoundManager"], function (JSONModel, __BaseController, ___util_StorageManager, ___util_SoundManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const StorageManager = ___util_StorageManager["StorageManager"];
  const SoundManager = ___util_SoundManager["SoundManager"];
  /**
   * @namespace com.game.toep.controller
   */
  const SelectLevel = BaseController.extend("com.game.toep.controller.SelectLevel", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.onRouteMatched = () => {
        const viewModel = this.getModel("viewModel");

        // Read the player name and coins from the storage and set them on the view model
        viewModel.setProperty("/playerName", StorageManager.getName());
        viewModel.setProperty("/playerCoins", StorageManager.getCoins());
        SoundManager.playMusic("intro");
      };
    },
    onInit: function _onInit() {
      this.getRouter().getRoute("selectlevel").attachPatternMatched(this.onRouteMatched, this);
      const viewModel = new JSONModel({
        playerName: "",
        playerCoins: 0
      });
      this.setModel(viewModel, "viewModel");
    },
    onPressStart: function _onPressStart(oEvent) {
      const source = oEvent.getSource();
      const bindingContext = source.getBindingContext("config");
      const level = bindingContext.getObject();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.getRouter().navTo("game", {
        level: level.key
      });
    }
  });
  return SelectLevel;
});