import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import GameObject, { LevelConfig } from "../util/game/Game";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import Card from "../util/game/Card";
import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import BasePlayer from "../util/game/BasePlayer";
import Fragment from "sap/ui/core/Fragment";
import Dialog from "sap/m/Dialog";
import { SoundManager } from "../util/SoundManager";

/**
 * @namespace com.game.toep.controller
 */
export default class Game extends BaseController {

    endGameDialog: Dialog;

    public onInit(): void {
        this.getRouter().getRoute("game").attachPatternMatched(this.onRouteMatched, this);

        const oGameModel = new JSONModel({});

        this.setModel(oGameModel, "game");
    }

    public onRouteMatched = (event: Route$PatternMatchedEvent): void => {
        const args = event.getParameter("arguments") as { level: int };
        this.setupNewGame(args.level);
        SoundManager.playMusic("gameplay");
    }

    public setupNewGame = (level: int): void => {
        const gameObject = new GameObject(this);

        // Read the level configuration from the Settings Model
        const levelConfig = this.getConfig().getProperty("/levels/" + String(level - 1)) as LevelConfig;  

        // Pass the level config to the Game Manager
        gameObject.setup(levelConfig);

        const gameModel = this.getModel("game") as JSONModel;

        gameModel.setProperty("/", gameObject);

    }

    public modelRefresh() {
        this.getModel("game").refresh();
    }

    public onSelectCard = (oEvent: Event): void => {
        const oSource = oEvent.getSource() as Control;
        const oBindingContext = oSource.getBindingContext("game");
        const oCard = oBindingContext.getObject() as Card;
        const oGame = this.getModel("game").getProperty("/") as GameObject;

        oGame.humanPlayer?.cardPicked(oCard);
    }

    public openWinnerDialog = async (): Promise<void> => {
        this.endGameDialog ??= await Fragment.load({
            id: this.getView().getId(),
            name: "com.game.toep.view.EndGameDialog",
            controller: this
        }) as Dialog;

		this.getView().addDependent(this.endGameDialog);

		this.endGameDialog.open();
    }

    public onStartNewGame = (): void => {
        const oGame = this.getModel("game").getProperty("/") as GameObject;

        // Start a new game with the same level configuration
        this.setupNewGame(oGame.levelConfig.key);
        this.endGameDialog.close();
    }

    public onExitGame = (): void => {
        this.getRouter().navTo("selectlevel");
        this.endGameDialog.close();
    }


}
