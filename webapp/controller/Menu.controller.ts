import BaseController from "./BaseController";
import Image from "sap/m/Image";
import Title from "sap/m/Title";
import Text from "sap/m/Text";
import Button from "sap/m/Button";
import { SoundManager } from "../util/SoundManager";

/**
 * @namespace com.game.toep.controller
 */
export default class Menu extends BaseController {

	onPressContinue(): void {
		this.getRouter().navTo("selectlevel");
	}

	onPressNewGame(): void {
		// Wipe any local storage first
		this.getRouter().navTo("selectlevel");
	}

	onPressTutorial(): void {
		this.getRouter().navTo("tutorial");
	}

	onPressCredits(): void {
		this.getRouter().navTo("credits");
	}
}
