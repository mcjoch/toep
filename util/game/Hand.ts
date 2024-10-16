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

    /**
     * Checks if any card in the hand can beat the given card
     */
    public canBeatCard(card: Card): boolean {
        return this.getLegalCards(card.suit).some(c => c.beats(card));
    }

    public getLowestLegalCard(leadingsuit: string): Card {
        const possibleCards = this.getLegalCards(leadingsuit);
        
        return this.getLowestFromCards(possibleCards);
    }

    public getHighestLegalCard(leadingsuit: string): Card {
        const possibleCards = this.getLegalCards(leadingsuit);
        
        return this.getHighestfromCards(possibleCards);
    }

    public getWinningCards(leadingCard: Card): Array<Card> {
        return this.cards.filter(card => card.beats(leadingCard));
    }

    public getLowestWinningCard(leadingCard: Card): Card {
        return this.getLowestFromCards(this.getWinningCards(leadingCard));
    }

    public getRandomLegalCard(leadingsuit: string): Card {
        const possibleCards = this.getLegalCards(leadingsuit);
        return possibleCards[Math.floor((Math.random() * possibleCards.length))];
    }

    private getLowestFromCards(cards: Array<Card>): Card {
        return cards.reduce((lowestCard, currentCard) => {
            if (currentCard.getNumericValue() < lowestCard.getNumericValue()) {
                return currentCard;
            }
            return lowestCard;
        });
    }

    private getHighestfromCards(cards: Array<Card>): Card {
        return cards.reduce((highestCard, currentCard) => {
            if (currentCard.getNumericValue() > highestCard.getNumericValue()) {
                return currentCard;
            }
            return highestCard;
        });
    }

}