import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import GameObject from "../util/game/Game";

/**
 * @namespace com.game.toep.controller
 */
export default class Game extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("game").attachPatternMatched(this.onRouteMatched, this);

        const oGameModel = new JSONModel({});

        this.setModel(oGameModel, "game");
    }

    public onRouteMatched = (): void => {
       this.setupNewGame();
    }

    public setupNewGame = (): void => {
        const oGameObject = new GameObject();
        oGameObject.setup();

        const oGameModel = this.getModel("game") as JSONModel;

        oGameModel.setProperty("/", oGameObject);
    }


}
