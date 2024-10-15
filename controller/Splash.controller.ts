import BaseController from "./BaseController";
import Image from "sap/m/Image";
import Title from "sap/m/Title";
import Text from "sap/m/Text";
import Button from "sap/m/Button";
import { SoundManager } from "../util/SoundManager";

/**
 * @namespace com.game.toep.controller
 */
export default class Main extends BaseController {

	splashClicked: boolean;

	public onPressSplash(): void {

		// Prevent multiple clicks
		if (this.splashClicked) {
			return;
		}

		this.splashClicked = true;

		// Rotate logo on click
		const svgElement = this.byId("splashLogo") as Image;
		svgElement.addStyleClass("rotate");

		SoundManager.playMusic("intro");

		// After 1 second, show app title
		void setTimeout(() => {
			const appTitle = this.byId("appTitle") as Title;
			appTitle.setVisible(true);
		}, 1000);

		// After 2.5 seconds, show app description
		void setTimeout(() => {
			const subTitle = this.byId("appDescription") as Text;
			subTitle.setVisible(true);
		}, 2500);

		// After 4 seconds, show start button
		void setTimeout(() => {
			const startButton = this.byId("startButton") as Button;
			startButton.setVisible(true);
		}, 4000);
	}

	public onPressStart(): void {
		this.getRouter().navTo("menu");
	}
}
