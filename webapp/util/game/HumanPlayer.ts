import { StorageManager } from "../StorageManager";
import BasePlayer from "./BasePlayer";
import Card from "./Card";

/**
 * @namespace com.game.toep.util.game
 */
export default class HumanPlayer extends BasePlayer {

    constructor() {
        super(StorageManager.getName());
    }

    pickCardToPlay(): Promise<Card> {
        throw new Error("Method not implemented.");
    }

}