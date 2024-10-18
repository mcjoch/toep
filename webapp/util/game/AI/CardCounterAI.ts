import BasePlayer from "../BasePlayer";
import Card from "../Card";
import Deck from "../Deck";
import Trick from "../Trick";
import AIInterface from "./AIInterface";

/**
 * @namespace com.game.toep.util.game.AI
 */
export default class CardCounterAI implements AIInterface {

    player: BasePlayer;

    constructor(player: BasePlayer) {
        this.player = player;
    }
    
    pickCardToPlay(trick: Trick): Card {

        const remainingCards = this.getRemainingCards(trick);
        const legalCards = this.player.hand.getLegalCards(trick.getLeadingSuit());
        const probabilities = this.calculateCardProbabilities(legalCards, remainingCards);
        
        // If we start the round
        if (!trick.hasLeadingCard()) {
            // In first 2 rounds, play the card with the lowest score
            if (trick.no === 1 || trick.no === 2) {
                return this.getLowestCardScore(probabilities);
            // Otherwise, play the card with the lowest chance of losing the round
            } else {
                return this.getLowestLossCount(probabilities);
            }
        }

         // If we cannot beat the leading card, play card with the lowest score
         if (!this.player.hand.canBeatCard(trick.getLeadingCard())) {
            return this.getLowestCardScore(probabilities);
        // If we can win
        } else {
            // In the first round, play the lowest card
            if (trick.no === 1) {
                return this.getLowestCardScore(probabilities);
            // In round 2, play the lowest card that can beat the leading card
            } else if (trick.no === 2) {
                return this.player.hand.getLowestWinningCard(trick.getLeadingCard());
            // Otherwise, play the card with the highest chance of winning the round
            } else {
                return this.getLowestLossCount(probabilities);
            }
        }

      
    }

    private getRemainingCards(trick: Trick): Card[] {
        let playedCards = trick.game.discardPile;
        playedCards = playedCards.concat(this.player.hand.cards);
        playedCards = playedCards.concat(trick.cardsPlayed);

        const allCards = new Deck().getCards();

        return allCards.filter(card => {
            const foundCard = playedCards.find((playedCard => (playedCard.suit === card.suit && playedCard.value === card.value)));
            return foundCard === undefined;
        });
    }

    /**
     * Get the card with the lowest chance of beating another card
     */
    private getLowestWinCount(probabilities: Array<CardProbability>): Card {
        let lowestWinCount = 100;
        let lowestWinningCard = null;
        probabilities.forEach(probability => {
            if (probability.winCount <= lowestWinCount) {
                lowestWinCount = probability.winCount;
                lowestWinningCard = probability.card;
            }
        });
        return lowestWinningCard;
    }

    /**
     * Get the card with the lowest chance of being beated
     */
    private getLowestLossCount(probabilities: Array<CardProbability>): Card {
        let lowestLossCount = 100;
        let lowestLosingCard = null;
        probabilities.forEach(probability => {
            if (probability.loseCount <= lowestLossCount) {
                lowestLossCount = probability.loseCount;
                lowestLosingCard = probability.card;
            }
        });
        return lowestLosingCard;
    }

    /**
     * Get the card with the lowest overall value
     */
    private getLowestCardScore(probabilities: Array<CardProbability>): Card {
        let lowestCardScore = 100;
        let lowestScoreCard = null;
        probabilities.forEach(probability => {
            if (probability.cardScore <= lowestCardScore) {
                lowestCardScore = probability.cardScore;
                lowestScoreCard = probability.card;
            }
        });

        return lowestScoreCard;
    }

    private calculateCardProbabilities(hand: Array<Card>, remainingCards: Card[]): Array<CardProbability> {
        const probabilities : Array<CardProbability> = [];

        hand.forEach(card => {
            let loseCount = 0;
            let winCount = 0;
            let sameSuitPoints = 0;
            remainingCards.forEach(remainingCard => {
                if (card.beats(remainingCard)) {
                    winCount++;
                }
                if (remainingCard.beats(card)) {
                    loseCount++;
                }
            });

            // Filter the cards in the hand that are of the same suit
            const cardsOfSameSuit = hand.filter(function(c){
                 return c.suit === card.suit;
            });

            // For each card of the same suit, add 2 points to the card score, 
            // but only if we have at least an 8, 9 or 10 of that suit to create a strong pair.
            if (cardsOfSameSuit.filter(c => c.value === '9' || c.value === '10' || c.value === '8').length > 0) {
                if (this.player.id === 4) {
                    sameSuitPoints = cardsOfSameSuit.length * 2;
                }
            }

            probabilities.push({
                card: card, 
                winCount: winCount,
                loseCount: loseCount,
                cardScore: (winCount - loseCount) + sameSuitPoints
            });
        });

        return probabilities;
    }

}

interface CardProbability {
    card: Card;
    winCount: number;
    loseCount: number;
    cardScore: number;
}