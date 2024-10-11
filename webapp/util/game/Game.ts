import { StorageManager } from "../StorageManager";
import AIPlayer from "./AIPlayer";
import BasePlayer from "./BasePlayer";
import Deck from "./Deck";
import HumanPlayer from "./HumanPlayer";

/**
 * @namespace com.game.toep.util.game
 */
export default class Game {

    public players: Array<BasePlayer>;
    public humanPlayer: HumanPlayer;
    private deck: Deck;

    public constructor() {
        // Initialie the players array
        this.players = [];
       
        // Create a deck
        this.deck = new Deck();

        // shuffle the deck
        this.deck.shuffle();
    }

    public setup () {
        // Create a human player
        const humanPlayer = new HumanPlayer();
        this.humanPlayer = humanPlayer;

        // Create the players array
        this.players.push(humanPlayer);
        this.players.push(new AIPlayer("Player 2"));
        this.players.push(new AIPlayer("Player 3"));
        this.players.push(new AIPlayer("Player 4"));

        // Deal 4 cards to each player
        for (let i = 0; i < 4; i++) {
            this.players.forEach(player => {
                player.dealCard(this.deck.takeCard());
            });
        }

        this.startGame();
    }

    public startGame() {
       // start the game
    }

}

export interface LevelConfig {
    key: number;
    title: string,
    subtitle: string,
    minimumBet: number,
    minimumToPlay: number,
    AIDescription: string
}