import Card from "./Card";

/**
 * @namespace com.game.toep.util.game
 */
export default class Deck {

    private cards: Array<Card>;

    constructor() {
        this.cards = [];
        const suits = ["spades", "diamonds", "clubs", "hearts"];
        const values = ["J", "Q", "K", "A", "7", "8", "9", "10"];

        for (let i = 0; i < suits.length; i++) {
            for (let x = 0; x < values.length; x++) {
                const card: Card = new Card(values[x], suits[i]);
                this.cards.push(card);
            }
        }
    }

    public shuffle() {
        // for 1000 turns
        // switch the values of two random cards
        for (let i = 0; i < 1000; i++) {
            const location1 = Math.floor((Math.random() * this.cards.length));
            const location2 = Math.floor((Math.random() * this.cards.length));
            const tmp = this.cards[location1];

            this.cards[location1] = this.cards[location2];
            this.cards[location2] = tmp;
        }
    }

    takeCard(): Card {
        // Take a card and remove it from the Deck
        return this.cards.pop();
    }
}