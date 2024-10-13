import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import { StorageManager } from "../util/StorageManager";
import Event from "sap/ui/base/Event";
import Control from "sap/ui/core/Control";
import { LevelConfig } from "../util/game/Game";
import { SoundManager } from "../util/SoundManager";

/**
 * @namespace com.game.toep.controller
 */
export default class SelectLevel extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("selectlevel").attachPatternMatched(this.onRouteMatched, this);

        const viewModel = new JSONModel({
            playerName: "",
            playerCoins: 0
        });

        this.setModel(viewModel, "viewModel");
    }

    public onRouteMatched = (): void => {
        const viewModel = this.getModel("viewModel") as JSONModel;

        // Read the player name and coins from the storage and set them on the view model
        viewModel.setProperty("/playerName", StorageManager.getName());
        viewModel.setProperty("/playerCoins", StorageManager.getCoins());

        SoundManager.playMusic("intro");
     }

    onPressStart(oEvent: Event): void {
        const source = oEvent.getSource() as Control;
        const bindingContext = source.getBindingContext("config");
        const level = bindingContext.getObject() as LevelConfig;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.getRouter().navTo("game", {level: level.key});
    }

}
