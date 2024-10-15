import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import MiniCardControlRenderer from "./MiniCardControlRenderer";

/**
 * @namespace com.game.toep.controls
 */
export default class MiniCardControl extends Control {

    static readonly metadata: MetadataOptions = {

        properties: {
            color: {
                type: "string"
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

    public getColor(): string {
        return this.getProperty("color") as string;
    }

    static renderer: typeof MiniCardControlRenderer = MiniCardControlRenderer;

}