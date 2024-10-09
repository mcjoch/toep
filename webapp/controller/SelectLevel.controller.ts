import BaseController from "./BaseController";

/**
 * @namespace com.game.toep.controller
 */
export default class SelectLevel extends BaseController {

    onPressStart() {
        this.getRouter().navTo("game");
    }

}
