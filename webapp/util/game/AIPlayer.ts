import BasePlayer from "./BasePlayer";
import Card from "./Card";

/**
 * @namespace com.game.toep.util.game
 */
export default class AIPlayer extends BasePlayer {
   
    private AI: AIInterface;

    public constructor(playerName: string) {
        super(playerName);
    }

    pickCardToPlay(): Promise<Card> {
        throw new Error("Method not implemented.");
    }

}