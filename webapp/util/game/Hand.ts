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

    removeCard(card: Card) {
        this.cards = this.cards.filter(c => c !== card);
    }

    getLegalCards(leadingsuit: string): Array<Card> {
        const cardsOfLeadingSuit = this.cards.filter(card => card.suit === leadingsuit);
        if (cardsOfLeadingSuit.length > 0) {
            return cardsOfLeadingSuit;
        }
        return this.cards;
    }

}