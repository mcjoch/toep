/**
 * @namespace com.game.toep.util.game
 */

import BasePlayer from "./BasePlayer";
import Card from "./Card";

export default class Trick {

    public cardsPlayed: Array<Card>;
    public no: number;

    constructor(no: number) {
        this.cardsPlayed = [];
        this.no = no;
    }

    public addCard(card: Card) {
        this.cardsPlayed.push(card);
    }

    getLeadingSuit(): string {
        if (this.cardsPlayed.length === 0) {
            return null;
        }
        return this.cardsPlayed[0].suit;
    }

    getLeadingCard(): Card {
        let winner = this.cardsPlayed[0];
        this.cardsPlayed.forEach(card => {
            if (card.beats(winner)) {
                winner = card;
            }
        });
        return winner;
    }

    getWinner(): BasePlayer {
       return this.getLeadingCard().player;
    }

}