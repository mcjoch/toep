import RenderManager from "sap/ui/core/RenderManager";
import CardControl from "./CardControl";

/**
 * @namespace com.game.toep.controls
 */
export default {

    render(oRm: RenderManager, oControl: CardControl): void {
        oRm.openStart("div", oControl);
            oRm.class("minicard");
            oRm.class(oControl.getColor());
        oRm.openEnd();
    }
}