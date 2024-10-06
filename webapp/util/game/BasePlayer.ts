/**
 * @namespace com.game.toep.util.game
 */

abstract class BasePlayer {

    protected hand: Hand;

    public constructor() {
        this.hand = new Hand();
    }

    public getHand(): Hand {
        return this.hand;
    }

    abstract pickCardToPlay(): Promise<Card>;

}