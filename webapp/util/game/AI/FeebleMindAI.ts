import BasePlayer from "../BasePlayer";
import Card from "../Card";
import Trick from "../Trick";
import AIInterface from "./AIInterface";

/**
 * @namespace com.game.toep.util.game.AI
 */
export default class FeebleMindAI implements AIInterface {

    player: BasePlayer;

    constructor(player: BasePlayer) {
        this.player = player;
    }
    
    pickCardToPlay(trick: Trick): Card {

        // If we cannot beat the leading card, play the lowest card
        if (trick.hasLeadingCard() && !this.player.hand.canBeatCard(trick.getLeadingCard())) {
            return this.player.hand.getLowestLegalCard(trick.getLeadingSuit());
        }

        // Otherwise, pick a random card
        return this.player.hand.getRandomLegalCard(trick.getLeadingSuit());
    }

}