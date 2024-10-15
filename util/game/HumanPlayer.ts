import { StorageManager } from "../StorageManager";
import BasePlayer from "./BasePlayer";
import Card from "./Card";
import Trick from "./Trick";

/**
 * @namespace com.game.toep.util.game
 */
export default class HumanPlayer extends BasePlayer {

    pendingCardPick: Promise<Card>;
    currentTrick: Trick;
    resolvePendingCardPick: (card: Card) => void;

    constructor(id: number) {
        super(id, StorageManager.getName());
    }

    pickCardToPlay(trick: Trick): Promise<Card> {
        this.currentTrick = trick;
        this.hand.markLegalCards(this.currentTrick.getLeadingSuit());
        
        return new Promise((resolve, reject) => {
            // Get the card from the user
            this.resolvePendingCardPick = resolve;
        });
    }


    cardPicked(card: Card) {
        // Check if a card is being awaited
        if (!this.resolvePendingCardPick) {
            return;
        }

        const legalCards = this.hand.getLegalCards(this.currentTrick.getLeadingSuit());

        // If an illegal card was chosen, return
        if (!legalCards.includes(card)) {
            return;
        }

        // Remove the chosen card from our hand
        this.hand.removeCard(card);

        // disable the remaining cards
        this.hand.disableAllCards();

        // Resolve the chosen card to the game controller class
        this.resolvePendingCardPick(card);

        // Reset the promise
        this.resolvePendingCardPick = null;
    }

}