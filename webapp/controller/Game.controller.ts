import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import GameObject, { LevelConfig } from "../util/game/Game";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

/**
 * @namespace com.game.toep.controller
 */
export default class Game extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("game").attachPatternMatched(this.onRouteMatched, this);

        const oGameModel = new JSONModel({});

        this.setModel(oGameModel, "game");
    }

    public onRouteMatched = (event: Route$PatternMatchedEvent): void => {
        const args = event.getParameter("arguments") as { level: int };
        this.setupNewGame(args.level);
    }

    public setupNewGame = (level: int): void => {
        const levelConfig = this.getConfig().getProperty("/levels/" + String(level)) as LevelConfig;
        const gameObject = new GameObject();

        gameObject.setup();

        const gameModel = this.getModel("game") as JSONModel;

        gameModel.setProperty("/", gameObject);
    }


}
