"use strict";

sap.ui.define([], function () {
  "use strict";

  /**
   * @namespace com.game.toep.controls
   */
  var __exports = {
    render(oRm, oControl) {
      oRm.openStart("div", oControl);
      oRm.class("card");
      oRm.class(oControl.getColor());
      if (!oControl.getActive()) {
        oRm.class("inactive");
      }
      if (oControl.getWinner()) {
        oRm.class("winner");
      }
      oRm.openEnd();
      oRm.text(oControl.getValue());
      oRm.write("<br>");
      oRm.openStart("div", oControl);
      oRm.class("symbol");
      oRm.openEnd();
      oRm.text(oControl.getSymbol());
      oRm.close("div");
    }
  };
  return __exports;
});