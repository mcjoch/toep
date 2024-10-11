import BaseObject from "sap/ui/base/Object";
import Card from "./Card";
import Hand from "./Hand";

/**
 * @namespace com.game.toep.util.game
 */
export default class BasePlayer extends BaseObject{

    public hand: Hand;
    public name: string;

    public constructor(playerName: string) {
        super();
        this.name = playerName;
        this.hand = new Hand();
    }

    public getHand(): Hand {
        return this.hand;
    }

    public dealCard(card: Card) {
        this.hand.addCard(card);
    }

    //abstract pickCardToPlay(): Promise<Card>;

}