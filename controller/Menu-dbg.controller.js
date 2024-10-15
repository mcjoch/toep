"use strict";

sap.ui.define(["./BaseController", "sap/m/Text", "sap/m/Button", "sap/m/Dialog", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", "../util/StorageManager"], function (__BaseController, Text, Button, Dialog, JSONModel, Fragment, ___util_StorageManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const StorageManager = ___util_StorageManager["StorageManager"];
  /**
   * @namespace com.game.toep.controller
   */
  const Menu = BaseController.extend("com.game.toep.controller.Menu", {
    onInit: function _onInit() {
      this.setModel(new JSONModel({
        newPlayerName: "",
        hasExistingSession: StorageManager.getName() !== null
      }), "viewModel");
    },
    onPressContinue: function _onPressContinue() {
      this.getRouter().navTo("selectlevel");
    },
    onPressNewGame: function _onPressNewGame() {
      const hasExistingSession = !!StorageManager.getName();
      if (hasExistingSession) {
        const dialog = new Dialog({
          title: "Start New Game",
          type: "Message",
          content: new Text({
            text: "Starting a new game will erase your current progress. Are you sure you want to continue?"
          }),
          beginButton: new Button({
            text: "Yes",
            press: () => {
              dialog.close();
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              this.openNewGameDialog();
            }
          }),
          endButton: new Button({
            text: "No",
            press: () => {
              dialog.close();
            }
          }),
          afterClose: () => {
            dialog.destroy();
          }
        });
        dialog.open();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.openNewGameDialog();
      }
    },
    openNewGameDialog: async function _openNewGameDialog() {
      this.newGameDialog ??= await Fragment.load({
        id: this.getView().getId(),
        name: "com.game.toep.view.NewGameDialog",
        controller: this
      });
      this.getView().addDependent(this.newGameDialog);
      this.newGameDialog.open();
    },
    onStartNewGame: function _onStartNewGame() {
      const viewModel = this.getModel("viewModel");
      const newPlayerName = viewModel.getProperty("/newPlayerName");

      // Store the player name
      StorageManager.setName(newPlayerName);

      // Set the starter coins to 10
      StorageManager.setCoins(10);

      // Move to the level selection screen
      this.getRouter().navTo("selectlevel");
    },
    onPressTutorial: function _onPressTutorial() {
      this.getRouter().navTo("tutorial");
    },
    onPressCredits: function _onPressCredits() {
      this.getRouter().navTo("credits");
    }
  });
  return Menu;
});