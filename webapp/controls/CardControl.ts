import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import CardControlRenderer from "./CardControlRenderer";

/**
 * @namespace com.game.toep.controls
 */
export default class CardControl extends Control {

    static readonly metadata: MetadataOptions = {

        properties: {
            value: {
                type: "string"
            },
            suit: {
                type: "string"
            },
            won: {
                type: "boolean"
            },
            active: {
                type: "boolean",
                defaultValue: true
            }
        },

        events: {
            "select": {}
        },

        dnd: {
            draggable: true,
            droppable: false
        }
    }

    public onclick(): void {
        this.fireEvent("select");
    }

    public getSymbol(): string {
        switch (this.getProperty("suit")) {
            case "hearts":
                return "♥";
            case "clubs":
                return "♣";
            case "diamonds":
                return "♦";
            case "spades":
                return "♠";
        }
    }

    public getColor(): string {
        switch (this.getProperty("suit")) {
            case "hearts":
            case "diamonds":
                return "red";
            case "clubs":
            case "spades":
                return "black";
        }
    }

    public getSuit(): string {
        return this.getProperty("suit") as string;
    }

    public getValue(): string {
        return this.getProperty("value") as string;
    }

    static renderer: typeof CardControlRenderer = CardControlRenderer;

}