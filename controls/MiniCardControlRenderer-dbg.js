"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.controls
   */
  var __exports = {
    render(oRm, oControl) {
      oRm.openStart("div", oControl);
      oRm.class("minicard");
      oRm.class(oControl.getColor());
      oRm.openEnd();
    }
  };
  return __exports;
});