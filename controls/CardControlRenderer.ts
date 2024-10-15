import RenderManager from "sap/ui/core/RenderManager";
import CardControl from "./CardControl";

/**
 * @namespace com.game.toep.controls
 */
export default {

    render(oRm: RenderManager, oControl: CardControl): void {
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
}