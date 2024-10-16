import AIInterface from "./AI/AIInterface";
import FeebleMindAI from "./AI/FeebleMindAI";
import RandomAI from "./AI/RandomAI";
import ReasoningAI from "./AI/ReasoningAI";
import BasePlayer from "./BasePlayer";
import Card from "./Card";
import { AIConfig } from "./Game";
import Trick from "./Trick";

/**
 * @namespace com.game.toep.util.game
 */
export default class AIPlayer extends BasePlayer {
   
    private AI: AIInterface;

    public constructor(config: AIConfig) {
        super(config.key,config.name);

        // Set the AI to be used
        switch(config.AI) {
            case "RandomAI":
                this.AI = new RandomAI(this);
                break;
            case "FeebleMindAI":
                this.AI = new FeebleMindAI(this);
                break;
            case "ReasoningAI":
                this.AI = new ReasoningAI(this);
                break;
            default:
                throw new Error(`Invalid AI choice: ${config.AI}`);
        }
    }

    pickCardToPlay(trick: Trick): Promise<Card> {
        return new Promise((resolve, reject) => {
            // Pick the first card for now
            const card = this.AI.pickCardToPlay(trick);

            // No delay in simulation games
            if (trick.game.isSimulation()) {
                // Remove the card from your hand
                this.hand.removeCard(card);

                // Resolve the chosen card back to the game
                resolve(card);
                return;
            }

             // Feign AI delay
             this.think(1500, 2500).then(() => {
                
                // Remove the card from your hand
                this.hand.removeCard(card);
            
                // Resolve the chosen card back to the game
                resolve(card);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}