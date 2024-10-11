/**
 * @namespace com.game.toep.util.game
 */

import BasePlayer from "./BasePlayer";

export default class Card {

    suit: string;
    value: string;
    player: BasePlayer

    constructor(value: string, suit: string) {
        this.value = value;
        this.suit = suit;
    }

    public getSuit(): string {
        return this.suit;
    }

    public getValue(): string {
        return this.value;
    }

    getNumericValue(): number {
        return ['J', 'Q', 'K', 'A', '7', '8', '9', '10'].indexOf(this.value);
    }

    public setPlayer(player: BasePlayer) {
        this.player = player;
    }   

    /**
     * Check if this card beats the given card
     */
    public beats(card: Card): boolean {
        if (this.suit === card.suit) {
            return this.getNumericValue() > card.getNumericValue();
        } else {
            return false;
        }
    }


}