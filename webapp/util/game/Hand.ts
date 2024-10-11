/**
 * @namespace com.game.toep.util.game
 */

import Card from "./Card";

export default class Hand {

    public cards: Array<Card>;

    constructor() {
        this.cards = [];
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }

}