"use strict";

sap.ui.define(["./BaseController", "../util/SoundManager"], function (__BaseController, ___util_SoundManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  const SoundManager = ___util_SoundManager["SoundManager"];
  /**
   * @namespace com.game.toep.controller
   */
  const Main = BaseController.extend("com.game.toep.controller.Main", {
    onPressSplash: function _onPressSplash() {
      // Prevent multiple clicks
      if (this.splashClicked) {
        return;
      }
      this.splashClicked = true;

      // Rotate logo on click
      const svgElement = this.byId("splashLogo");
      svgElement.addStyleClass("rotate");
      SoundManager.playMusic("intro");

      // After 1 second, show app title
      void setTimeout(() => {
        const appTitle = this.byId("appTitle");
        appTitle.setVisible(true);
      }, 1000);

      // After 2.5 seconds, show app description
      void setTimeout(() => {
        const subTitle = this.byId("appDescription");
        subTitle.setVisible(true);
      }, 2500);

      // After 4 seconds, show start button
      void setTimeout(() => {
        const startButton = this.byId("startButton");
        startButton.setVisible(true);
      }, 4000);
    },
    onPressStart: function _onPressStart() {
      this.getRouter().navTo("menu");
    }
  });
  return Main;
});