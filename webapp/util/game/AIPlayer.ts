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
    }

    pickCardToPlay(trick: Trick): Promise<Card> {
        return new Promise((resolve, reject) => {
            // Get the card from the user
            const possibleCards = this.hand.getLegalCards(trick.getLeadingSuit());

            // Pick the first card for now
            const card = possibleCards[0];

             // Feign AI delay
             this.think(500, 100).then(() => {
                
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