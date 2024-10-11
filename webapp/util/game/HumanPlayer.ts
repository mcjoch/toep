import { StorageManager } from "../StorageManager";
import BasePlayer from "./BasePlayer";
import Card from "./Card";
import Trick from "./Trick";

/**
 * @namespace com.game.toep.util.game
 */
export default class HumanPlayer extends BasePlayer {

    constructor(id: number) {
        super(id, StorageManager.getName());
    }

    pickCardToPlay(trick: Trick): Promise<Card> {
        // TODO for Human Player, replace this
        return new Promise((resolve, reject) => {
            // Get the card from the user
            const possibleCards = this.hand.getLegalCards(trick.getLeadingSuit());

            // Pick the first card for now
            const card: Card = possibleCards[0];

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