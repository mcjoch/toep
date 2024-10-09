import Control from "sap/ui/core/Control";
import Card from "../util/game/Card";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";

/**
 * @namespace com.game.toep.controls
 */
class CardControl extends Control {

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

   

    public init(): void {
        //
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

    private getSuit(): string {
        return this.getProperty("suit") as string;
    }

    private getValue(): string {
        return this.getProperty("value") as string;
    }

    public renderer(oRm: RenderManager, oControl: CardControl): void {
        //
        oRm.openStart("div", oControl);
            oRm.class("card");
            oRm.class(oControl.getColor());
        oRm.openEnd();

        oRm.text(oControl.getValue());
        oRm.write("<br>");

        oRm.openStart("div", oControl);
            oRm.class("symbol");
        oRm.openEnd();
            oRm.text(oControl.getSymbol());
        oRm.close("div");




    }
}