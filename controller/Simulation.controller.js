"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","./BaseController","../util/game/SimulationGame"],function(t,e,n){"use strict";function i(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const s=i(e);const o=i(n);const a=s.extend("com.game.toep.controller.Simulation",{constructor:function t(){s.prototype.constructor.apply(this,arguments);this.aiWins=[];this.completedRuns=0;this.onRouteMatched=()=>{const t=this.getSimulationConfig();const e=this.getModel("viewModel");t.AIs.forEach(t=>{this.aiWins.push({key:t.key,name:t.name,wins:0})});e.setProperty("/aiWins",this.aiWins);this.runGames().then(()=>{this.calculateWinPercentages();e.setProperty("/simulating",false);e.setProperty("/aiWins",this.aiWins);console.log(this.aiWins)}).catch(t=>{console.error(t)})};this.setupSimulationGame=t=>{const e=new o;e.setup(t);return e}},onInit:function e(){this.getRouter().getRoute("simulation").attachPatternMatched(this.onRouteMatched,this);const n=new t({completedRuns:0,targetRuns:1e4,simulating:true,aiWins:[]});this.setModel(n,"viewModel")},calculateWinPercentages:function t(){const e=this.aiWins.reduce((t,e)=>t+e.wins,0);this.aiWins.forEach(t=>{const n=t.wins/e*100;t.percentage=Math.round(n*100)/100})},updateWinCount:function t(e){this.aiWins[e-1].wins++},runGames:function t(){const e=this.getModel("viewModel");this.completedRuns=0;const n=[];for(let t=0;t<20;t++){n.push(this.runGamesBatch(500))}return Promise.all(n)},runGamesBatch:async function t(e){const n=this.getModel("viewModel");this.completedRuns=0;for(let t=0;t<e;t++){const t=this.getSimulationConfig();const e=this.setupSimulationGame(t);const i=await e.startGame();this.updateWinCount(i.id);this.completedRuns++;n.setProperty("/completedRuns",this.completedRuns)}},getSimulationConfig:function t(){return{key:1,title:"Simulation",subtitle:"",minimumBet:0,minimumToPlay:0,AIDescription:"",AIs:[{key:1,name:"Random AI",AI:"RandomAI"},{key:2,name:"Feeble Mind AI",AI:"FeebleMindAI"},{key:3,name:"Reasoning AI",AI:"ReasoningAI"},{key:4,name:"Card Counter AI",AI:"CardCounterAI"}]}}});return a});
//# sourceMappingURL=Simulation.controller.js.map