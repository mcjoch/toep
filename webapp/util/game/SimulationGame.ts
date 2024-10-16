import AIPlayer from "./AIPlayer";
import BasePlayer from "./BasePlayer";
import Game, { LevelConfig } from "./Game";

export default class SimulationGame extends Game {

    constructor() {
        super(null);

        this.simulation = true;
        this.waitTime = 0;
    }

    // In the simulation games we have no visualizations, and no ViewModel to refresh
    protected refreshViewModel() {
        return;
    }

    /**
     * Setup the game
     */
    public setup (levelConfig: LevelConfig) : void {
        levelConfig.AIs.forEach((aiConfig) => {
            this.players.push(new AIPlayer(aiConfig));
        });

        // Deal 4 cards to each player
        for (let i = 0; i < 4; i++) {
            this.players.forEach(player => {
                player.dealCard(this.deck.takeCard());
            });
        }
    }
}