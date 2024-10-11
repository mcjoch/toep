import BaseObject from "sap/ui/base/Object";
import Card from "./Card";
import Hand from "./Hand";
import Trick from "./Trick";

/**
 * @namespace com.game.toep.util.game
 */
export default abstract class BasePlayer extends BaseObject{

    public hand: Hand;
    public name: string;
    public id: number;
    public folded: boolean;

    public constructor(id: number, playerName: string) {
        super();
        this.id = id;
        this.name = playerName;
        this.hand = new Hand();
        this.folded = false;
    }

    // Getters and Setters

    public getHand(): Hand {
        return this.hand;
    }

    public hasFolded(): boolean {
        return this.folded;
    }

    // Utilitiy Functions

    public dealCard(card: Card) {
        this.hand.addCard(card);

        // Store the owner on the card so we can track who played it
        card.setPlayer(this);
    }

    public fold() {
        this.folded = true;
    }

    public think(min: number, max: number): Promise<void> {
        const ms = Math.floor(Math.random() * (max - min + 1) + min);
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    abstract pickCardToPlay(trick: Trick): Promise<Card>

}