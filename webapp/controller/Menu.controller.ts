import BaseController from "./BaseController";
import Image from "sap/m/Image";
import Title from "sap/m/Title";
import Text from "sap/m/Text";
import Button from "sap/m/Button";
import { SoundManager } from "../util/SoundManager";
import Dialog from "sap/m/Dialog";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import Fragment from "sap/ui/core/Fragment";
import { StorageManager } from "../util/StorageManager";

/**
 * @namespace com.game.toep.controller
 */
export default class Menu extends BaseController {

	newGameDialog: Dialog;

	onInit(): void {
		this.setModel(new JSONModel({
			newPlayerName: "",
		}), "viewModel");
	}

	onPressContinue(): void {
		this.getRouter().navTo("selectlevel");
	}

	async onPressNewGame(): Promise<void> {
		this.newGameDialog ??= await Fragment.load({
            id: this.getView().getId(),
            name: "com.game.toep.view.NewGameDialog",
            controller: this
        }) as Dialog;

		this.getView().addDependent(this.newGameDialog);

		this.newGameDialog.open();
	}

	onStartNewGame(): void {
		const viewModel = this.getModel("viewModel");
		const newPlayerName = viewModel.getProperty("/newPlayerName") as string;

		// Store the player name
		StorageManager.setName(newPlayerName);

		// Set the starter coins to 10
		StorageManager.setCoins(10);

		// Move to the level selection screen
		this.getRouter().navTo("selectlevel");
	}

	onPressTutorial(): void {
		this.getRouter().navTo("tutorial");
	}

	onPressCredits(): void {
		this.getRouter().navTo("credits");
	}
}
