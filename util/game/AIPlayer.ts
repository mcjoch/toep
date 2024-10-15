import AIInterface from "./AI/AIInterface";
import RandomAI from "./AI/RandomAI";
import BasePlayer from "./BasePlayer";
import Card from "./Card";
import Trick from "./Trick";

/**
 * @namespace com.game.toep.util.game
 */
export default class AIPlayer extends BasePlayer {
   
    private AI: AIInterface;

    public constructor(id: number, playerName: string) {
        super(id,playerName);

        // Replace with dynamic AI choice
        this.AI = new RandomAI(this);
    }

    pickCardToPlay(trick: Trick): Promise<Card> {
        return new Promise((resolve, reject) => {
            // Pick the first card for now
            const card = this.AI.pickCardToPlay(trick);

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