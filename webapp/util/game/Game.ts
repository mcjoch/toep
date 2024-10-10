import AIPlayer from "./AIPlayer";
import BasePlayer from "./BasePlayer";
import Deck from "./Deck";
import HumanPlayer from "./HumanPlayer";

/**
 * @namespace com.game.toep.util.game
 */
export default class Game {

    public players: Array<BasePlayer>;
    private deck: Deck;

    public constructor() {
        // Initialie the players array
        this.players = [];
       
        // Create a deck
        this.deck = new Deck();
    }

    public setup () {
        this.players.push(new HumanPlayer("Player 1"));
        this.players.push(new AIPlayer("Player 2"));
        this.players.push(new AIPlayer("Player 3"));
        this.players.push(new AIPlayer("Player 4"));
    }

    public deal() {
        // Deal the cards
    }

    public start() {
       // start the game
    }

}