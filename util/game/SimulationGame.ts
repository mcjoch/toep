import Game from "./Game";

export default class SimulationGame extends Game {
    constructor() {
        super(null);
    }

    // In the simulation games we have no visualizations, and no ViewModel to refresh
    protected refreshViewModel() {
        return;
    }
}