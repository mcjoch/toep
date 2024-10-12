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

    public removeCard(card: Card) {
        this.cards = this.cards.filter(c => c !== card);
    }

    public getLegalCards(leadingsuit: string): Array<Card> {
        const cardsOfLeadingSuit = this.cards.filter(card => card.suit === leadingsuit);
        if (cardsOfLeadingSuit.length > 0) {
            return cardsOfLeadingSuit;
        }
        return this.cards;
    }

    public markLegalCards(leadingsuit: string) {
        this.cards.forEach(card => {
            card.active = this.getLegalCards(leadingsuit).includes(card);
        });
    }

    public disableAllCards() {
        this.cards.forEach(card => {
            card.active = false;
        });
    }

}