/**
 * @namespace com.game.toep.util.game
 */

class Game {

    private players: Array<BasePlayer>;
    private deck: Deck;

    public constructor() {
        // Add the human player
        this.players.push(new HumanPlayer());

        // TODO: Add some AI Players

        // Create a deck
        this.deck = new Deck();
    }

    public deal() {
        // Deal the cards
    }

    public start() {
       // start the game
    }

}