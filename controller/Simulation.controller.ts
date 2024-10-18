import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import SimulationGame from "../util/game/SimulationGame";
import { LevelConfig } from "../util/game/Game";
import AIPlayer from "../util/game/AIPlayer";
import BasePlayer from "../util/game/BasePlayer";
import Control from "sap/ui/core/Control";

/**
 * @namespace com.game.toep.controller
 */
export default class Simulation extends BaseController {

    private aiWins: AIWins[] = [];
    private completedRuns = 0;
    
    public onInit(): void {
        this.getRouter().getRoute("simulation").attachPatternMatched(this.onRouteMatched, this);

        const viewModel = new JSONModel({
            completedRuns: 0,
            targetRuns: 10000,
            simulating: true,
            aiWins: [],
        });

        this.setModel(viewModel, "viewModel");
    }

    public onRouteMatched = (): void => {
        // Pass the level config to the Game Manager
        const simulationConfig = this.getSimulationConfig();
        const viewModel = this.getModel("viewModel") as JSONModel;

        // Set the win count for each AI to 0
        simulationConfig.AIs.forEach((aiConfig) => {
            this.aiWins.push({ key: aiConfig.key, name: aiConfig.name, wins: 0 });
        });
        viewModel.setProperty("/aiWins", this.aiWins);

        // Run the simulation games
        this.runGames().then(() => {
            this.calculateWinPercentages();
            viewModel.setProperty("/simulating", false);
            viewModel.setProperty("/aiWins", this.aiWins);
            console.log(this.aiWins);
        }).catch((error) => {
            console.error(error);
        });
    
     }
     private calculateWinPercentages(): void {
        const totalWins = this.aiWins.reduce((acc, ai) => acc + ai.wins, 0);
        this.aiWins.forEach((ai) => {
             const percentage = (ai.wins / totalWins) * 100;
             // Round to two decimals
             ai.percentage = Math.round(percentage * 100) / 100;
        });
     }

     private updateWinCount(winner: number): void {
        this.aiWins[winner - 1].wins++;
     }

     private runGames(): Promise<void[]> {
        const viewModel = this.getModel("viewModel") as JSONModel;
        this.completedRuns = 0;
        const promises = [];

        // Run 10 simulation games in parallel
        for (let j = 0; j < 20; j++) {
            promises.push(this.runGamesBatch(500));
        }

        return Promise.all(promises);
        
     }

     private async runGamesBatch(num: number): Promise<void> {
        const viewModel = this.getModel("viewModel") as JSONModel;
        this.completedRuns = 0;

        // Run the simulation game 10 times
        for (let i = 0; i < num; i++) {
            // Pass the level config to the Game Manager
            const simulationConfig = this.getSimulationConfig();

            // Create a new simGame
            const simGame: SimulationGame = this.setupSimulationGame(simulationConfig);

            // Start the simGame
            const winner: BasePlayer = await simGame.startGame();
            this.updateWinCount(winner.id);
            this.completedRuns++;
            viewModel.setProperty("/completedRuns", this.completedRuns);
        }
        
     }



     public setupSimulationGame = (simulationConfig: LevelConfig): SimulationGame => {
        const gameObject = new SimulationGame();

        gameObject.setup(simulationConfig);
        
        return gameObject; 
    }

    private getSimulationConfig(): LevelConfig {
        return {
            "key": 1,
            "title": "Simulation",
            "subtitle": "",
            "minimumBet": 0,
            "minimumToPlay": 0,
            "AIDescription": "",
            AIs: [
                { key: 1, name: "Random AI", AI: "RandomAI" },
                { key: 2, name: "Feeble Mind AI", AI: "FeebleMindAI" },
                { key: 3, name: "Reasoning AI", AI: "ReasoningAI" },
                { key: 4, name: "Card Counter AI", AI: "CardCounterAI" }
                
            ]
        }
    }

}

interface AIWins {
    key: number,
    name: string,
    wins: number
    percentage?: number
}
