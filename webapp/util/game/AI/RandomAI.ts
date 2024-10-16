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
       // Pick a random card
       return this.player.hand.getRandomLegalCard(trick.getLeadingSuit());
    }

}