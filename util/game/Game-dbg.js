"use strict";

sap.ui.define(["../StorageManager", "./AIPlayer", "./Deck", "./HumanPlayer", "./Trick", "../SoundManager"], function (___StorageManager, __AIPlayer, __Deck, __HumanPlayer, __Trick, ___SoundManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const StorageManager = ___StorageManager["StorageManager"];
  const AIPlayer = _interopRequireDefault(__AIPlayer);
  const Deck = _interopRequireDefault(__Deck);
  const HumanPlayer = _interopRequireDefault(__HumanPlayer);
  const Trick = _interopRequireDefault(__Trick);
  const SoundManager = ___SoundManager["SoundManager"];
  /**
   * @namespace com.game.toep.util.game
   */
  class Game {
    /**
     * Constructor function
     * initializes the game
     */
    constructor(controller) {
      this.controller = controller;

      // Initialie the players array
      this.players = [];

      // Create a deck
      this.deck = new Deck();

      // shuffle the deck
      this.deck.shuffle();
      this.cardsPlayed = [];
      this.discardPile = [];
      this.coinSummary = [];

      // Standard wait time between tricks is 4 seconds
      this.waitTime = 4000;
    }

    /**
     * Setup the game
     */
    setup(levelConfig) {
      // Set the level configuration
      this.levelConfig = levelConfig;

      // Create a human player
      const humanPlayer = new HumanPlayer(1);
      this.humanPlayer = humanPlayer;
      this.coinsPaid = levelConfig.minimumBet;
      this.players.push(humanPlayer);
      levelConfig.AIs.forEach(aiConfig => {
        this.players.push(new AIPlayer(aiConfig));
      });

      // Take the minimum bet from the player
      StorageManager.setCoins(StorageManager.getCoins() - levelConfig.minimumBet);

      // Set the pot of coins
      this.coins = levelConfig.minimumBet * this.players.length;

      // Deal 4 cards to each player
      for (let i = 0; i < 4; i++) {
        this.players.forEach(player => {
          player.dealCard(this.deck.takeCard());
        });
      }
    }

    /**
     * Unfortunatelty, the JSONModel bound in the Game Controller does not pick up asynchronous changes to the model.
     * This method is called to force the model to refresh.
     */
    refreshViewModel() {
      this.controller.modelRefresh();
    }

    /**
     * get the players which are still in the game
     */
    getRemainingPlayers() {
      return this.players.filter(player => !player.hasFolded());
    }

    /**
     * Starts the game
     * 
     * Returns a promise with the game winner
     */
    startGame() {
      this.currentTrick = new Trick(1, this);
      this.setCurrentPlayer(this.getRandomPlayer());
      return new Promise(resolve => {
        this.resolveGameEnded = resolve;
      });
    }

    /**
     * Sets the current turn to the provided player
     */
    setCurrentPlayer(player) {
      // Update the current player
      this.currentPlayer = player;

      // If the player has folded, simply continue with the next player
      if (player.hasFolded()) {
        this.endTurn();
        return;
      }

      // Get the player to pick a card to play
      this.currentPlayer.pickCardToPlay(this.currentTrick).then(card => {
        this.playCard(card);
      }).catch(error => {
        console.error("Error picking card to play:", error);
      });
    }

    /**
     * Play a card
     */
    playCard(card) {
      if (!this.isSimulation()) {
        SoundManager.playCardSound();
      }

      // Add the card to the current trick
      this.currentTrick.addCard(card);

      // Ends the players turn
      this.endTurn();
    }

    /**
     * Ends the turn
     */
    endTurn() {
      // Check if the trick has ended (e.g. there is one card played for each remaining player)
      if (this.currentTrick.cardsPlayed.length === this.getRemainingPlayers().length) {
        this.currentTrick.markWinner();
        this.refreshViewModel();
        setTimeout(() => {
          this.endTrick();
          this.refreshViewModel();
        }, this.waitTime);

        // Otherwise, the next player is up
      } else {
        this.setCurrentPlayer(this.getNextPlayer());
        this.refreshViewModel();
      }
    }

    /**
     * Ends the trick
     */
    endTrick() {
      // If this was the last trick, end the game
      if (this.currentTrick.no === 4) {
        this.endGame();
        return;
      }

      // Call the winner of the trick
      const trickWinner = this.currentTrick.getWinner();

      // Clear the winner highlighting
      this.players.forEach(player => {
        player.setWinner(false);
      });

      // Start a new trick
      this.currentTrick = new Trick(this.currentTrick.no + 1, this);

      // The winner of the previous trick starts
      this.setCurrentPlayer(trickWinner);
    }

    /**
     * The game has ended. Declare the winner.
     */
    endGame() {
      const gameWinner = this.currentTrick.getWinner();

      // If this is not a simulation game, we need to set some properties for the End Game screen.
      if (!this.isSimulation()) {
        this.winner = gameWinner;
        this.coinSummary.push({
          label: "Former total",
          coins: StorageManager.getCoins() + this.coinsPaid
        });
        this.coinSummary.push({
          label: "Bet",
          coins: -this.coinsPaid
        });
        if (gameWinner instanceof HumanPlayer) {
          // Award the player their coins
          this.coinSummary.push({
            label: "Winnings",
            coins: this.coins
          });
          StorageManager.setCoins(StorageManager.getCoins() + this.coins);
        }
        this.coinSummary.push({
          label: "New Total",
          coins: StorageManager.getCoins()
        });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.controller.openWinnerDialog();
      }
      this.resolveGameEnded(gameWinner);
    }

    /**
     * returns a random player from the players array
     */
    getRandomPlayer() {
      return this.players[Math.floor(Math.random() * this.players.length)];
    }

    /**
     * returns the next player in the players array
     */
    getNextPlayer() {
      const index = this.players.indexOf(this.currentPlayer);
      return this.players[(index + 1) % this.players.length];
    }
    isSimulation() {
      return this.simulation;
    }
  }
  return Game;
});