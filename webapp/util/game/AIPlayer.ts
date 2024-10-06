/**
 * @namespace com.game.toep.util.game
 */
class AIPlayer extends BasePlayer {
   
    private AI: AIInterface;

    public constructor() {
        super();
    }

    pickCardToPlay(): Promise<Card> {
        throw new Error("Method not implemented.");
    }

}