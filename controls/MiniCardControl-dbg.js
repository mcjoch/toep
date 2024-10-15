"use strict";

sap.ui.define(["sap/ui/core/Control", "./MiniCardControlRenderer"], function (Control, __MiniCardControlRenderer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const MiniCardControlRenderer = _interopRequireDefault(__MiniCardControlRenderer);
  /**
   * @namespace com.game.toep.controls
   */
  const MiniCardControl = Control.extend("com.game.toep.controls.MiniCardControl", {
    renderer: MiniCardControlRenderer,
    metadata: {
      properties: {
        color: {
          type: "string"
        }
      },
      events: {
        "select": {}
      },
      dnd: {
        draggable: true,
        droppable: false
      }
    },
    getColor: function _getColor() {
      return this.getProperty("color");
    }
  });
  return MiniCardControl;
});