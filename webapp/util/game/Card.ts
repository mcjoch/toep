/**
 * @namespace com.game.toep.util.game
 */

export default class Card {

    suit: string;
    value: string;

    constructor(value: string, suit: string) {
        this.value = value;
        this.suit = suit;
    }

    public getSuit(): string {
        return this.suit;
    }

    public getValue(): string {
        return this.suit;
    }


}