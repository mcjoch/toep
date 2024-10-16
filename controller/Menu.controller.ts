import BaseController from "./BaseController";
import Text from "sap/m/Text";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
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
			hasExistingSession: StorageManager.getName() !== null,
		}), "viewModel");
	}

	onPressContinue(): void {
		this.getRouter().navTo("selectlevel");
	}

	onPressNewGame(): void {
		const hasExistingSession = !!StorageManager.getName();
		if (hasExistingSession) {
			const dialog = new Dialog({
				title: "Start New Game",
				type: "Message",
				content: new Text({
					text: "Starting a new game will erase your current progress. Are you sure you want to continue?"
				}),
				beginButton: new Button({
					text: "Yes",
					press: () => {
						dialog.close();
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						this.openNewGameDialog();
					}
				}),
				endButton: new Button({
					text: "No",
					press: () => {
						dialog.close();
					}
				}),
				afterClose: () => {
					dialog.destroy();
				}
			});

			dialog.open();
		}
		else {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.openNewGameDialog();
		}
	}

	private async openNewGameDialog(): Promise<void> {
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

	onPressSimulation(): void {
		this.getRouter().navTo("simulation");
	}
}
