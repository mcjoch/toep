import BasePlayer from "../BasePlayer";
import Card from "../Card";
import Trick from "../Trick";
import AIInterface from "./AIInterface";

/**
 * @namespace com.game.toep.util.game.AI
 */
export default class RandomAI implements AIInterface {

    player: BasePlayer;

    constructor(player: BasePlayer) {
        this.player = player;
    }
    
    pickCardToPlay(trick: Trick): Card {
        // Get the card from the user
       const possibleCards = this.player.hand.getLegalCards(trick.getLeadingSuit());

       // Pick a random card
       const card = possibleCards[Math.floor((Math.random()*possibleCards.length))];

       return card;
    }

}