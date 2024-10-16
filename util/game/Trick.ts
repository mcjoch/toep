/**
 * @namespace com.game.toep.util.game
 */

import BasePlayer from "./BasePlayer";
import Card from "./Card";
import Game from "./Game";

export default class Trick {

    public cardsPlayed: Array<Card>;
    public no: number;
    public game: Game;

    constructor(no: number, game: Game) {
        this.cardsPlayed = [];
        this.no = no;
        this.game = game;
    }

    public addCard(card: Card) {
        this.cardsPlayed.push(card);
    }

    public getLeadingSuit(): string {
        if (this.cardsPlayed.length === 0) {
            return null;
        }
        return this.cardsPlayed[0].suit;
    }

    public hasLeadingCard(): boolean {
        return this.cardsPlayed.length > 0;
    }

    public getLeadingCard(): Card {
        let winner = this.cardsPlayed[0];
        this.cardsPlayed.forEach(card => {
            if (card.beats(winner)) {
                winner = card;
            }
        });
        return winner;
    }

    public getWinner(): BasePlayer {
        return this.getLeadingCard().player;
    }

    /**
     * Mark the winning player and card
     */
    public markWinner() {
        this.getLeadingCard().setWinner(true);
        this.getWinner().setWinner(true);
    }

}