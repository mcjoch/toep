import BasePlayer from "../BasePlayer";
import Card from "../Card";
import Trick from "../Trick";

/**
 * @namespace com.game.toep.util.game.AI
 */
export default interface AIInterface {

    player: BasePlayer;

    pickCardToPlay(trick: Trick): Card;
}