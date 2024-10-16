//@ui5-bundle com/game/toep/Component-preload.js
sap.ui.require.preload({
	"com/game/toep/Component.js":function(){
"use strict";sap.ui.define(["sap/ui/core/UIComponent","./model/models","sap/ui/Device","sap/m/IllustrationPool"],function(t,e,s,i){"use strict";function n(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const o=n(e);const a=t.extend("com.game.toep.Component",{metadata:{manifest:"json"},init:function e(){t.prototype.init.call(this);this.setModel(o.createDeviceModel(),"device");this.getRouter().initialize();const s={setFamily:"tnt",setURI:sap.ui.require.toUrl("sap/tnt/themes/base/illustrations")};i.registerIllustrationSet(s,false)},getContentDensityClass:function t(){if(this.contentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this.contentDensityClass=""}else if(!s.support.touch){this.contentDensityClass="sapUiSizeCompact"}else{this.contentDensityClass="sapUiSizeCozy"}}return this.contentDensityClass}});return a});
},
	"com/game/toep/controller/App.controller.js":function(){
"use strict";sap.ui.define(["./BaseController"],function(e){"use strict";function t(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=t(e);const o=n.extend("com.game.toep.controller.App",{onInit:function e(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}});return o});
},
	"com/game/toep/controller/BaseController.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/core/routing/History"],function(e,t,n){"use strict";const o=e.extend("com.game.toep.controller.BaseController",{getOwnerComponent:function t(){return e.prototype.getOwnerComponent.call(this)},getRouter:function e(){return t.getRouterFor(this)},getResourceBundle:function e(){const t=this.getOwnerComponent().getModel("i18n");return t.getResourceBundle()},getModel:function e(t){return this.getView().getModel(t)},setModel:function e(t,n){this.getView().setModel(t,n);return this},navTo:function e(t,n,o){this.getRouter().navTo(t,n,undefined,o)},onNavBack:function e(){const t=n.getInstance().getPreviousHash();if(t!==undefined){window.history.go(-1)}else{this.getRouter().navTo("main",{},undefined,true)}},getConfig:function e(){return this.getOwnerComponent().getModel("config")}});return o});
},
	"com/game/toep/controller/Credits.controller.js":function(){
"use strict";sap.ui.define(["./BaseController"],function(e){"use strict";function t(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=t(e);const o=n.extend("com.game.toep.controller.Credits",{});return o});
},
	"com/game/toep/controller/Game.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","./BaseController","../util/game/Game","sap/ui/core/Fragment","../util/SoundManager"],function(e,t,o,n,s){"use strict";function a(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const i=a(t);const r=a(o);const c=s["SoundManager"];const g=i.extend("com.game.toep.controller.Game",{constructor:function e(){i.prototype.constructor.apply(this,arguments);this.onRouteMatched=e=>{const t=e.getParameter("arguments");this.setupNewGame(t.level);c.playMusic("gameplay")};this.setupNewGame=e=>{const t=new r(this);const o=this.getConfig().getProperty("/levels/"+String(e-1));t.setup(o);const n=this.getModel("game");n.setProperty("/",t);t.startGame()};this.onSelectCard=e=>{const t=e.getSource();const o=t.getBindingContext("game");const n=o.getObject();const s=this.getModel("game").getProperty("/");s.humanPlayer?.cardPicked(n)};this.openWinnerDialog=async()=>{this.endGameDialog??=await n.load({id:this.getView().getId(),name:"com.game.toep.view.EndGameDialog",controller:this});this.getView().addDependent(this.endGameDialog);this.endGameDialog.open()};this.onStartNewGame=()=>{const e=this.getModel("game").getProperty("/");this.setupNewGame(e.levelConfig.key);this.endGameDialog.close()};this.onExitGame=()=>{this.getRouter().navTo("selectlevel");this.endGameDialog.close()}},onInit:function t(){this.getRouter().getRoute("game").attachPatternMatched(this.onRouteMatched,this);const o=new e({});this.setModel(o,"game")},modelRefresh:function e(){this.getModel("game").refresh()}});return g});
},
	"com/game/toep/controller/Menu.controller.js":function(){
"use strict";sap.ui.define(["./BaseController","sap/m/Text","sap/m/Button","sap/m/Dialog","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","../util/StorageManager"],function(e,t,n,o,s,a,i){"use strict";function r(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const l=r(e);const u=i["StorageManager"];const c=l.extend("com.game.toep.controller.Menu",{onInit:function e(){this.setModel(new s({newPlayerName:"",hasExistingSession:u.getName()!==null}),"viewModel")},onPressContinue:function e(){this.getRouter().navTo("selectlevel")},onPressNewGame:function e(){const s=!!u.getName();if(s){const e=new o({title:"Start New Game",type:"Message",content:new t({text:"Starting a new game will erase your current progress. Are you sure you want to continue?"}),beginButton:new n({text:"Yes",press:()=>{e.close();this.openNewGameDialog()}}),endButton:new n({text:"No",press:()=>{e.close()}}),afterClose:()=>{e.destroy()}});e.open()}else{this.openNewGameDialog()}},openNewGameDialog:async function e(){this.newGameDialog??=await a.load({id:this.getView().getId(),name:"com.game.toep.view.NewGameDialog",controller:this});this.getView().addDependent(this.newGameDialog);this.newGameDialog.open()},onStartNewGame:function e(){const t=this.getModel("viewModel");const n=t.getProperty("/newPlayerName");u.setName(n);u.setCoins(10);this.getRouter().navTo("selectlevel")},onPressTutorial:function e(){this.getRouter().navTo("tutorial")},onPressCredits:function e(){this.getRouter().navTo("credits")},onPressSimulation:function e(){this.getRouter().navTo("simulation")}});return c});
},
	"com/game/toep/controller/SelectLevel.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","./BaseController","../util/StorageManager","../util/SoundManager"],function(e,t,o,n){"use strict";function s(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const r=s(t);const a=o["StorageManager"];const c=n["SoundManager"];const i=r.extend("com.game.toep.controller.SelectLevel",{constructor:function e(){r.prototype.constructor.apply(this,arguments);this.onRouteMatched=()=>{const e=this.getModel("viewModel");e.setProperty("/playerName",a.getName());e.setProperty("/playerCoins",a.getCoins());c.playMusic("intro")}},onInit:function t(){this.getRouter().getRoute("selectlevel").attachPatternMatched(this.onRouteMatched,this);const o=new e({playerName:"",playerCoins:0});this.setModel(o,"viewModel")},onPressStart:function e(t){const o=t.getSource();const n=o.getBindingContext("config");const s=n.getObject();this.getRouter().navTo("game",{level:s.key})}});return i});
},
	"com/game/toep/controller/Simulation.controller.js":function(){
"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","./BaseController","../util/game/SimulationGame"],function(t,e,n){"use strict";function i(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const s=i(e);const o=i(n);const a=s.extend("com.game.toep.controller.Simulation",{constructor:function t(){s.prototype.constructor.apply(this,arguments);this.aiWins=[];this.onRouteMatched=()=>{const t=this.getSimulationConfig();const e=this.getModel("viewModel");t.AIs.forEach(t=>{this.aiWins.push({key:t.key,name:t.name,wins:0})});e.setProperty("/aiWins",this.aiWins);this.runGames().then(()=>{this.calculateWinPercentages();e.setProperty("/simulating",false);e.setProperty("/aiWins",this.aiWins);console.log(this.aiWins)}).catch(t=>{console.error(t)})};this.setupSimulationGame=t=>{const e=new o;e.setup(t);return e}},onInit:function e(){this.getRouter().getRoute("simulation").attachPatternMatched(this.onRouteMatched,this);const n=new t({completedRuns:0,targetRuns:1e3,simulating:true,aiWins:[]});this.setModel(n,"viewModel")},calculateWinPercentages:function t(){const e=this.aiWins.reduce((t,e)=>t+e.wins,0);this.aiWins.forEach(t=>{const n=t.wins/e*100;t.percentage=Math.round(n*100)/100})},updateWinCount:function t(e){this.aiWins[e-1].wins++},runGames:async function t(){const e=this.getModel("viewModel");for(let t=0;t<1e3;t++){const n=this.getSimulationConfig();const i=this.setupSimulationGame(n);const s=await i.startGame();this.updateWinCount(s.id);e.setProperty("/completedRuns",t+1)}},getSimulationConfig:function t(){return{key:1,title:"Simulation",subtitle:"",minimumBet:0,minimumToPlay:0,AIDescription:"",AIs:[{key:1,name:"Random AI 1",AI:"RandomAI"},{key:2,name:"Random AI 2",AI:"RandomAI"},{key:3,name:"Feeble Mind AI",AI:"FeebleMindAI"},{key:4,name:"Reasoning AI",AI:"ReasoningAI"}]}}});return a});
},
	"com/game/toep/controller/Splash.controller.js":function(){
"use strict";sap.ui.define(["./BaseController","../util/SoundManager"],function(t,e){"use strict";function s(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const i=s(t);const o=e["SoundManager"];const n=i.extend("com.game.toep.controller.Main",{onInit:function t(){void setTimeout(()=>{if(!this.splashClicked){const t=this.byId("clickCards");t.setVisible(true)}},4e3)},onPressSplash:function t(){if(this.splashClicked){return}this.splashClicked=true;const e=this.byId("clickCards");e.setVisible(false);const s=this.byId("splashLogo");s.addStyleClass("rotate");o.playMusic("intro");void setTimeout(()=>{const t=this.byId("appTitle");t.setVisible(true)},1e3);void setTimeout(()=>{const t=this.byId("appDescription");t.setVisible(true)},2500);void setTimeout(()=>{const t=this.byId("startButton");t.setVisible(true)},4e3)},onPressStart:function t(){this.getRouter().navTo("menu")}});return n});
},
	"com/game/toep/controller/Tutorial.controller.js":function(){
"use strict";sap.ui.define(["./BaseController"],function(e){"use strict";function t(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=t(e);const o=n.extend("com.game.toep.controller.Tutorial",{});return o});
},
	"com/game/toep/controls/CardControl.js":function(){
"use strict";sap.ui.define(["sap/ui/core/Control","./CardControlRenderer"],function(e,t){"use strict";function r(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=r(t);const s=e.extend("com.game.toep.controls.CardControl",{renderer:n,metadata:{properties:{value:{type:"string"},suit:{type:"string"},winner:{type:"boolean",defaultValue:false},active:{type:"boolean",defaultValue:true}},events:{select:{}},dnd:{draggable:true,droppable:false}},onclick:function e(){this.fireEvent("select")},getSymbol:function e(){switch(this.getProperty("suit")){case"hearts":return"♥";case"clubs":return"♣";case"diamonds":return"♦";case"spades":return"♠"}},getColor:function e(){switch(this.getProperty("suit")){case"hearts":case"diamonds":return"red";case"clubs":case"spades":return"black"}},getSuit:function e(){return this.getProperty("suit")},getValue:function e(){return this.getProperty("value")},getActive:function e(){return this.getProperty("active")},getWinner:function e(){return this.getProperty("winner")}});return s});
},
	"com/game/toep/controls/CardControlRenderer.js":function(){
"use strict";sap.ui.define([],function(){"use strict";var e={render(e,t){e.openStart("div",t);e.class("card");e.class(t.getColor());if(!t.getActive()){e.class("inactive")}if(t.getWinner()){e.class("winner")}e.openEnd();e.text(t.getValue());e.write("<br>");e.openStart("div",t);e.class("symbol");e.openEnd();e.text(t.getSymbol());e.close("div")}};return e});
},
	"com/game/toep/controls/MiniCardControl.js":function(){
"use strict";sap.ui.define(["sap/ui/core/Control","./MiniCardControlRenderer"],function(e,t){"use strict";function r(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const o=r(t);const n=e.extend("com.game.toep.controls.MiniCardControl",{renderer:o,metadata:{properties:{color:{type:"string"}},events:{select:{}},dnd:{draggable:true,droppable:false}},getColor:function e(){return this.getProperty("color")}});return n});
},
	"com/game/toep/controls/MiniCardControlRenderer.js":function(){
"use strict";sap.ui.define([],function(){"use strict";var e={render(e,r){e.openStart("div",r);e.class("minicard");e.class(r.getColor());e.openEnd()}};return e});
},
	"com/game/toep/i18n/i18n_en.properties":'# Splash Screen\nappTitle=Toep!\nappDescription=A simple Dutch Card Game\nstart=Start\nclickCardsToGetStarted=Click on the cards to get started\n\n# Main Menu\nbuiltInUI5=Developed in UI5 and TypeScript\ncontinue=Continue\nnewGame=New Game\ntutorial=Tutorial\ncredits=Credits\nsimulation=Simulation\nenterName=Enter your name\nname=Name\nstart=Start\n\n# Level selection screen\nselectLevel=Select Level\n\n# Game Screen\nyourTurn=Your turn.\nplayAgain=Play again\nleave=Leave\n',
	"com/game/toep/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"com.game.toep","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"dataSources":{"config_data":{"uri":"model/config.json","type":"JSON"}}},"sap.ui":{"technology":"UI5","icons":{},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"com.game.toep.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.129.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.tnt":{},"sap.f":{}}},"handleValidation":true,"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.game.toep.i18n.i18n"}},"config":{"type":"sap.ui.model.json.JSONModel","dataSource":"config_data"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"com.game.toep.view","controlId":"app","controlAggregation":"pages","async":true},"routes":[{"pattern":"","name":"splash","target":"splash"},{"pattern":"menu","name":"menu","target":"menu"},{"pattern":"selectlevel","name":"selectlevel","target":"selectlevel"},{"pattern":"credits","name":"credits","target":"credits"},{"pattern":"tutorial","name":"tutorial","target":"tutorial"},{"pattern":"simulation","name":"simulation","target":"simulation"},{"pattern":"game/{level}","name":"game","target":"game"}],"targets":{"splash":{"viewId":"splash","viewName":"Splash"},"menu":{"viewId":"menu","viewName":"Menu"},"selectlevel":{"viewId":"selectlevel","viewName":"SelectLevel"},"credits":{"viewId":"credits","viewName":"Credits"},"tutorial":{"viewId":"tutorial","viewName":"Tutorial"},"game":{"viewId":"game","viewName":"Game"},"simulation":{"viewId":"simulation","viewName":"Simulation"}}}}}',
	"com/game/toep/model/formatter.js":function(){
"use strict";sap.ui.define([],function(){"use strict";var e={formatValue:e=>e?.toUpperCase()};return e});
},
	"com/game/toep/model/models.js":function(){
"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/model/BindingMode","sap/ui/Device"],function(e,i,n){"use strict";var s={createDeviceModel:()=>{const s=new e(n);s.setDefaultBindingMode(i.OneWay);return s}};return s});
},
	"com/game/toep/util/SoundManager.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class a{playCardSound(){this.playSound("playCard"+String(this.getRandom(1,3)))}playSound(a){const r={playCard1:new Audio("mp3/playCard1.mp3"),playCard2:new Audio("mp3/playCard2.mp3"),playCard3:new Audio("mp3/playCard3.mp3")}[a];void r.play()}playMusic(a){if(this._currentMusicKey===a)return;const r={intro:new Audio("mp3/intro.mp3"),gameplay:new Audio("mp3/gameplay.mp3")}[a];r.loop=true;r.volume=.6;this._currentMusicAudio?.pause();this._currentMusicKey=a;this._currentMusicAudio=r;void r.play()}getRandom(a,r){return Math.floor(Math.random()*(r-a+1))+a}}const r=new a;a.SoundManager=r;return a});
},
	"com/game/toep/util/StorageManager.js":function(){
"use strict";sap.ui.define(["sap/ui/util/Storage"],function(e){"use strict";class t{constructor(){this.storage=new e(e.Type.local,"toep_storage")}setName(e){this.storage.put("player_name",e)}getName(){return this.storage.get("player_name")}setCoins(e){this.storage.put("player_coins",e)}getCoins(){return this.storage.get("player_coins")}}const s=new t;t.StorageManager=s;return t});
},
	"com/game/toep/util/game/AI/AIInterface.js":function(){
"use strict";sap.ui.define([],function(){"use strict";return AIInterface});
},
	"com/game/toep/util/game/AI/FeebleMindAI.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class a{constructor(a){this.player=a}pickCardToPlay(a){if(a.hasLeadingCard()&&!this.player.hand.canBeatCard(a.getLeadingCard())){return this.player.hand.getLowestLegalCard(a.getLeadingSuit())}return this.player.hand.getRandomLegalCard(a.getLeadingSuit())}}return a});
},
	"com/game/toep/util/game/AI/RandomAI.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class t{constructor(t){this.player=t}pickCardToPlay(t){return this.player.hand.getRandomLegalCard(t.getLeadingSuit())}}return t});
},
	"com/game/toep/util/game/AI/ReasoningAI.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class e{constructor(e){this.player=e}pickCardToPlay(e){if(!e.hasLeadingCard()){if(e.no===1||e.no===2){return this.player.hand.getLowestLegalCard(null)}else{return this.player.hand.getHighestLegalCard(null)}}if(!this.player.hand.canBeatCard(e.getLeadingCard())){return this.player.hand.getLowestLegalCard(e.getLeadingSuit())}else{return this.player.hand.getLowestWinningCard(e.getLeadingCard())}}}return e});
},
	"com/game/toep/util/game/AIPlayer.js":function(){
"use strict";sap.ui.define(["./AI/FeebleMindAI","./AI/RandomAI","./AI/ReasoningAI","./BasePlayer"],function(e,t,n,i){"use strict";function s(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const a=s(e);const o=s(t);const r=s(n);const c=s(i);const u=c.extend("com.game.toep.util.game.AIPlayer",{constructor:function e(t){c.prototype.constructor.call(this,t.key,t.name);switch(t.AI){case"RandomAI":this.AI=new o(this);break;case"FeebleMindAI":this.AI=new a(this);break;case"ReasoningAI":this.AI=new r(this);break;default:throw new Error(`Invalid AI choice: ${t.AI}`)}},pickCardToPlay:function e(t){return new Promise((e,n)=>{const i=this.AI.pickCardToPlay(t);if(t.game.isSimulation()){this.hand.removeCard(i);e(i);return}this.think(1500,2500).then(()=>{this.hand.removeCard(i);e(i)}).catch(e=>{n(e)})})}});return u});
},
	"com/game/toep/util/game/BasePlayer.js":function(){
"use strict";sap.ui.define(["sap/ui/base/Object","./Hand"],function(t,n){"use strict";function e(t){return t&&t.__esModule&&typeof t.default!=="undefined"?t.default:t}const i=e(n);const s=t.extend("com.game.toep.util.game.BasePlayer",{constructor:function n(e,s){t.prototype.constructor.call(this);this.id=e;this.name=s;this.hand=new i;this.folded=false;this.winner=false},getHand:function t(){return this.hand},hasFolded:function t(){return this.folded},dealCard:function t(n){this.hand.addCard(n);n.setPlayer(this)},fold:function t(){this.folded=true},think:function t(n,e){const i=Math.floor(Math.random()*(e-n+1)+n);return new Promise(t=>setTimeout(t,i))},setWinner:function t(n){this.winner=n}});return s});
},
	"com/game/toep/util/game/Card.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class e{constructor(e,t){this.value=e;this.suit=t;this.active=false;this.winner=false}getSuit(){return this.suit}getValue(){return this.value}getNumericValue(){return["J","Q","K","A","7","8","9","10"].indexOf(this.value)}setPlayer(e){this.player=e}setWinner(e){this.winner=e}beats(e){if(this.suit===e.suit){return this.getNumericValue()>e.getNumericValue()}else{return false}}}return e});
},
	"com/game/toep/util/game/Deck.js":function(){
"use strict";sap.ui.define(["./Card"],function(s){"use strict";function t(s){return s&&s.__esModule&&typeof s.default!=="undefined"?s.default:s}const e=t(s);class r{constructor(){this.cards=[];const s=["spades","diamonds","clubs","hearts"];const t=["J","Q","K","A","7","8","9","10"];for(let r=0;r<s.length;r++){for(let a=0;a<t.length;a++){const n=new e(t[a],s[r]);this.cards.push(n)}}}shuffle(){let s=this.cards.length,t,e;while(--s>0){t=Math.floor(Math.random()*(s+1));e=this.cards[t];this.cards[t]=this.cards[s];this.cards[s]=e}}takeCard(){return this.cards.pop()}}return r});
},
	"com/game/toep/util/game/Game.js":function(){
"use strict";sap.ui.define(["../StorageManager","./AIPlayer","./Deck","./HumanPlayer","./Trick","../SoundManager"],function(e,t,i,r,s,n){"use strict";function a(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const h=e["StorageManager"];const o=a(t);const l=a(i);const c=a(r);const u=a(s);const d=n["SoundManager"];class m{constructor(e){this.controller=e;this.players=[];this.deck=new l;this.deck.shuffle();this.cardsPlayed=[];this.discardPile=[];this.coinSummary=[];this.waitTime=4e3}setup(e){this.levelConfig=e;const t=new c(1);this.humanPlayer=t;this.coinsPaid=e.minimumBet;this.players.push(t);e.AIs.forEach(e=>{this.players.push(new o(e))});h.setCoins(h.getCoins()-e.minimumBet);this.coins=e.minimumBet*this.players.length;for(let e=0;e<4;e++){this.players.forEach(e=>{e.dealCard(this.deck.takeCard())})}}refreshViewModel(){this.controller.modelRefresh()}getRemainingPlayers(){return this.players.filter(e=>!e.hasFolded())}startGame(){this.currentTrick=new u(1,this);this.setCurrentPlayer(this.getRandomPlayer());this.refreshViewModel();return new Promise(e=>{this.resolveGameEnded=e})}setCurrentPlayer(e){this.currentPlayer=e;if(e.hasFolded()){this.endTurn();return}this.currentPlayer.pickCardToPlay(this.currentTrick).then(e=>{this.playCard(e)}).catch(e=>{console.error("Error picking card to play:",e)})}playCard(e){if(!this.isSimulation()){d.playCardSound()}this.currentTrick.addCard(e);this.endTurn()}endTurn(){if(this.currentTrick.cardsPlayed.length===this.getRemainingPlayers().length){this.currentTrick.markWinner();this.refreshViewModel();setTimeout(()=>{this.endTrick();this.refreshViewModel()},this.waitTime)}else{this.setCurrentPlayer(this.getNextPlayer());this.refreshViewModel()}}endTrick(){if(this.currentTrick.no===4){this.endGame();return}const e=this.currentTrick.getWinner();this.players.forEach(e=>{e.setWinner(false)});this.currentTrick=new u(this.currentTrick.no+1,this);this.setCurrentPlayer(e)}endGame(){const e=this.currentTrick.getWinner();if(!this.isSimulation()){this.winner=e;this.coinSummary.push({label:"Former total",coins:h.getCoins()+this.coinsPaid});this.coinSummary.push({label:"Bet",coins:-this.coinsPaid});if(e instanceof c){this.coinSummary.push({label:"Winnings",coins:this.coins});h.setCoins(h.getCoins()+this.coins)}this.coinSummary.push({label:"New Total",coins:h.getCoins()});this.controller.openWinnerDialog()}this.resolveGameEnded(e)}getRandomPlayer(){return this.players[Math.floor(Math.random()*this.players.length)]}getNextPlayer(){const e=this.players.indexOf(this.currentPlayer);return this.players[(e+1)%this.players.length]}isSimulation(){return this.simulation}}return m});
},
	"com/game/toep/util/game/Hand.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class t{constructor(){this.cards=[]}addCard(t){this.cards.push(t)}removeCard(t){this.cards=this.cards.filter(e=>e!==t)}getLegalCards(t){const e=this.cards.filter(e=>e.suit===t);if(e.length>0){return e}return this.cards}markLegalCards(t){this.cards.forEach(e=>{e.active=this.getLegalCards(t).includes(e)})}disableAllCards(){this.cards.forEach(t=>{t.active=false})}canBeatCard(t){return this.getLegalCards(t.suit).some(e=>e.beats(t))}getLowestLegalCard(t){const e=this.getLegalCards(t);return this.getLowestFromCards(e)}getHighestLegalCard(t){const e=this.getLegalCards(t);return this.getHighestfromCards(e)}getWinningCards(t){return this.cards.filter(e=>e.beats(t))}getLowestWinningCard(t){return this.getLowestFromCards(this.getWinningCards(t))}getRandomLegalCard(t){const e=this.getLegalCards(t);return e[Math.floor(Math.random()*e.length)]}getLowestFromCards(t){return t.reduce((t,e)=>{if(e.getNumericValue()<t.getNumericValue()){return e}return t})}getHighestfromCards(t){return t.reduce((t,e)=>{if(e.getNumericValue()>t.getNumericValue()){return e}return t})}}return t});
},
	"com/game/toep/util/game/HumanPlayer.js":function(){
"use strict";sap.ui.define(["../StorageManager","./BasePlayer"],function(e,t){"use strict";function r(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const n=e["StorageManager"];const i=r(t);const a=i.extend("com.game.toep.util.game.HumanPlayer",{constructor:function e(t){i.prototype.constructor.call(this,t,n.getName())},pickCardToPlay:function e(t){this.currentTrick=t;this.hand.markLegalCards(this.currentTrick.getLeadingSuit());return new Promise((e,t)=>{this.resolvePendingCardPick=e})},cardPicked:function e(t){if(!this.resolvePendingCardPick){return}const r=this.hand.getLegalCards(this.currentTrick.getLeadingSuit());if(!r.includes(t)){return}this.hand.removeCard(t);this.hand.disableAllCards();this.resolvePendingCardPick(t);this.resolvePendingCardPick=null}});return a});
},
	"com/game/toep/util/game/SimulationGame.js":function(){
"use strict";sap.ui.define(["./AIPlayer","./Game"],function(e,t){"use strict";function s(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const r=s(e);const u=s(t);class i extends u{constructor(){super(null);this.simulation=true;this.waitTime=0}refreshViewModel(){return}setup(e){e.AIs.forEach(e=>{this.players.push(new r(e))});for(let e=0;e<4;e++){this.players.forEach(e=>{e.dealCard(this.deck.takeCard())})}}}return i});
},
	"com/game/toep/util/game/Trick.js":function(){
"use strict";sap.ui.define([],function(){"use strict";class e{constructor(e,t){this.cardsPlayed=[];this.no=e;this.game=t}addCard(e){this.cardsPlayed.push(e)}getLeadingSuit(){if(this.cardsPlayed.length===0){return null}return this.cardsPlayed[0].suit}hasLeadingCard(){return this.cardsPlayed.length>0}getLeadingCard(){let e=this.cardsPlayed[0];this.cardsPlayed.forEach(t=>{if(t.beats(e)){e=t}});return e}getWinner(){return this.getLeadingCard().player}markWinner(){this.getLeadingCard().setWinner(true);this.getWinner().setWinner(true)}}return e});
},
	"com/game/toep/view/App.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><App id="app" /></mvc:View>\n',
	"com/game/toep/view/Credits.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Credits"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Title\n            titleStyle="H1"\n            text="{i18n>credits}"\n            textAlign="Center"\n            class="sapUiLargeMarginBottom cursive"\n        /></VBox></mvc:View>\n',
	"com/game/toep/view/EndGameDialog.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><Dialog\n\t\ttitle="{i18n>Game Ended}"\n\t\tbusyIndicatorDelay="0"\n\t\tstate="Information"\n\t\tcontentWidth="80%"\n\t\tcontentHeight="80%"\n\t\tclass="sapUiContentPadding"><buttons><Button text="{i18n>playAgain}" press=".onStartNewGame" icon="sap-icon://media-play" type="Emphasized"/><Button text="{i18n>leave}" press=".onExitGame" icon="sap-icon://system-exit"/></buttons><IllustratedMessage \n\t\t\tillustrationSize="Auto"\n\t\t\tillustrationType="{= ${game>/winner/id} === ${game>/humanPlayer/id} ? \'tnt-Mission\' : \'tnt-MissionFailed\' }" \n\t\t\tdescription="{= ${game>/winner/id} === ${game>/humanPlayer/id} ? (\'Coins won: \' + ${game>/coins}) : \'\' } " \n\t\t\ttitle="{game>/winner/name} won!"/><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Table id="gameEndTable" items="{game>/coinSummary}" width="20rem"><columns><Column></Column><Column></Column></columns><items><ColumnListItem vAlign="Middle"><cells><Text text="{game>label}" /><HBox alignItems="Center" justifyContent="End"><Text text="{game>coins}" /><Image src="img/coin.svg" width="1.4rem" height="1.4rem" class="coin headerImage"/></HBox></cells></ColumnListItem></items></Table></VBox></Dialog></core:FragmentDefinition>',
	"com/game/toep/view/Game.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Game"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:l="sap.ui.layout"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:tnt="sap.tnt"\n\txmlns:core="sap.ui.core"\n\txmlns:toep="com.game.toep.controls"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><l:FixFlex fixFirst="false"><l:flexContent><l:FixFlex fixFirst="true"><l:fixContent><Toolbar width="100%" height="2rem"><ToolbarSpacer /><FlexBox alignItems="Center" alignContent="Center"><Text text="Winner gets: {game>/coins}" /><Image src="img/coin.svg" width="1.4rem" height="1.4rem" class="coin headerImage"/></FlexBox><ToolbarSpacer /></Toolbar><VBox alignItems="Center"><HBox class="sapUiSmallMarginTop" items="{ path: \'game>/players\'}"><items><VBox alignItems="Center" class="sapUiSmallMarginBeginEnd"><Avatar\n\t\t\t\t\t\t\t\t\t\t\tenabled="{= ${game>winner} || ${game>/currentPlayer/id} === ${game>id} }"\n\t\t\t\t\t\t\t\t\t\t\tbackgroundColor="{= ${game>winner} ? \'Accent8\' : \'Accent1\' }"\n\t\t\t\t\t\t\t\t\t\t\tfallbackIcon="sap-icon://person-placeholder"\n\t\t\t\t\t\t\t\t\t\t\tbadgeIcon="{= ${game>winner} ? \'sap-icon://accept\' : \'\' }"\n\t\t\t\t\t\t\t\t\t\t\tbadgeValueState="Information"\n\t\t\t\t\t\t\t\t\t\t\tshowBorder="true"\n\t\t\t\t\t\t\t\t\t\t\tdisplaySize="{= ${device>/system/phone} ? \'M\' : \'XL\'}"\n\t\t\t\t\t\t\t\t\t\t\tpress="onPress"/><HBox class="cardsInHand" items="{path: \'game>hand/cards\', templateShareable:false}"><items><toep:MiniCardControl color=""/></items></HBox><Text text="{game>name}" class="sapUiTinyMarginTop"/></VBox></items></HBox></VBox></l:fixContent><l:flexContent><VBox alignItems="Center" height="100%"><HBox items="{game>/currentTrick/cardsPlayed}" height="100%" alignItems="Center" width="22rem"><items><VBox alignItems="Center"><toep:CardControl suit="{game>suit}" value="{game>value}" winner="{game>winner}"/><Text text="{game>player/name}"/></VBox></items></HBox></VBox></l:flexContent></l:FixFlex></l:flexContent><l:fixContent><VBox alignItems="Center" height="10rem"><HBox height="2rem" ><tnt:InfoLabel text="{i18n>yourTurn}" colorScheme="6" width = "140px" visible="{= ${game>/currentPlayer/id} === ${game>/humanPlayer/id} }"/></HBox><HBox items="{game>/humanPlayer/hand/cards}"><items><toep:CardControl suit="{game>suit}" value="{game>value}" active="{game>active}" select="onSelectCard"/></items></HBox></VBox></l:fixContent></l:FixFlex></mvc:View>\n',
	"com/game/toep/view/Menu.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Menu"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Title\n            titleStyle="H1"\n            text="{i18n>appTitle}"\n            textAlign="Center"\n            class="sapUiLargeMarginBottom cursive"\n        /><Button text="{i18n>continue}" enabled="{viewModel>/hasExistingSession}" width="300px" icon="sap-icon://media-play" press=".onPressContinue"/><Button text="{i18n>newGame}" width="300px" icon="sap-icon://add" press=".onPressNewGame"/><Button text="{i18n>tutorial}" width="300px" icon="sap-icon://learning-assistant" press=".onPressTutorial"/><Button text="{i18n>credits}" width="300px" icon="sap-icon://group" press=".onPressCredits"/><Button text="{i18n>simulation}" width="300px" icon="sap-icon://simulate" press=".onPressSimulation" enabled="true"/><Text text="{i18n>builtInUI5}" class="sapUiLargeMarginTop"/></VBox></mvc:View>\n',
	"com/game/toep/view/NewGameDialog.fragment.xml":'<core:FragmentDefinition\n\txmlns="sap.m"\n\txmlns:core="sap.ui.core"><Dialog\n\t\ttitle="{i18n>enterName}"\n\t\tbusyIndicatorDelay="0"\n\t\tclass="sapUiContentPadding"><Label text="{i18n>name}:"/><Input value="{viewModel>/newPlayerName}"/><Button text="{i18n>start}" press=".onStartNewGame"/></Dialog></core:FragmentDefinition>',
	"com/game/toep/view/SelectLevel.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.SelectLevel"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:f="sap.f"\n\txmlns:card="sap.f.cards"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Title\n            titleStyle="H1"\n            text="{i18n>selectLevel}"\n            textAlign="Center"\n            class="sapUiLargeMarginBottom cursive"\n\t\t\twidth="300px"\n        /><HBox><Text text="{viewModel>/playerName}" class="largeText sapUiLargeMarginEnd"/><Text text="{viewModel>/playerCoins}" class="largeText"/><Image src="img/coin.svg" width="1.7rem" class="coin"/></HBox><Carousel ariaLabelledBy="carouselTitle" width="350px" class="sapUiContentPadding" arrowsPlacement="PageIndicator" pages="{config>/levels}"><pages><f:Card><f:header><card:Header title="{config>title}" subtitle="{config>AIDescription}" /></f:header><f:content><VBox height="110px" class="sapUiSmallMargin" justifyContent="SpaceBetween"><HBox><Text text="Ante: {config>minimumBet}"/><Image src="img/coin.svg" width="0.9rem" class="coin"/></HBox><HBox><Text text="Minimum coins to unlock: {config>minimumToPlay}"/><Image src="img/coin.svg" width="0.9rem" class="coin"/></HBox><Button text="{i18n>start}" type="Emphasized" press=".onPressStart" enabled="{= ${viewModel>/playerCoins} >= ${config>minimumToPlay} }"/></VBox></f:content></f:Card></pages></Carousel></VBox></mvc:View>\n',
	"com/game/toep/view/Simulation.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Simulation"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Title\n            titleStyle="H1"\n            text="{i18n>simulation}"\n            textAlign="Center"\n            class="sapUiLargeMarginBottom cursive"\n        /><Text text="Simulating 1000 games.." class="sapUiSmallMarginBottom" visible="{viewModel>/simulating}"/><ProgressIndicator\n\t\t\tclass="sapUiSmallMarginBottom"\n\t\t\tpercentValue="{= ${viewModel>/completedRuns} / ${viewModel>/targetRuns} * 100}"\n\t\t\tdisplayValue="{viewModel>/completedRuns} of {viewModel>/targetRuns}"\n\t\t\tshowValue="true"\n\t\t\twidth="30rem"\n\t\t\tstate="Success"/><Table id="resultsTable" items="{viewModel>/aiWins}" busy="{viewModel>/simulating}" width="30rem"><columns><Column><Text text="AI" /></Column><Column><Text text="Wins" /></Column><Column><Text text="Percentage" /></Column></columns><items><ColumnListItem vAlign="Middle"><cells><Text text="{viewModel>name}" /><Text text="{viewModel>wins}" /><Text text="{viewModel>percentage}%" /></cells></ColumnListItem></items></Table></VBox></mvc:View>\n',
	"com/game/toep/view/Splash.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Splash"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center" class="splashScreen"><HBox height="50px" class="sapUiLargeMarginBottom"><Title\n\t\t\t\tclass="cursive"\n\t\t\t\tid="appTitle"\n\t\t\t\ttitleStyle="H1"\n\t\t\t\ttext="{i18n>appTitle}"\n\t\t\t\ttextAlign="Center"\n\t\t\t\tvisible="false"\n\t\t\t/></HBox><Image\n\t\t\tid="splashLogo"\n\t\t\tsrc="img/playing-card-logo.svg"\n\t\t\twidth="100%"\n\t\t\tdensityAware="true"\n\t\t\tdecorative="false"\n\t\t\tpress=".onPressSplash"\n\t\t/><VBox height="100px" alignItems="Center"><Text\n\t\t\t\tid="clickCards"\n\t\t\t\ttext="{i18n>clickCardsToGetStarted}"\n\t\t\t\ttextAlign="Center"\n\t\t\t\twrapping="true"\n\t\t\t\twidth="100%"\n\t\t\t\tvisible="false"\n\t\t\t/><Text\n\t\t\t\tid="appDescription"\n\t\t\t\ttext="{i18n>appDescription}"\n\t\t\t\ttextAlign="Center"\n\t\t\t\twrapping="true"\n\t\t\t\twidth="100%"\n\t\t\t\tvisible="false"\n\t\t\t/><Button \n\t\t\t\tid="startButton" \n\t\t\t\ttext="{i18n>start}" \n\t\t\t\tvisible="false" \n\t\t\t\ttype="Emphasized"\n\t\t\t\tclass="sapUiTinyMarginTop"\n\t\t\t\tpress=".onPressStart"\n\t\t\t/></VBox></VBox></mvc:View>\n',
	"com/game/toep/view/Tutorial.view.xml":'<mvc:View\n\tcontrollerName="com.game.toep.controller.Tutorial"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:core="sap.ui.core"\n\tcore:require="{\n\t\tformatter: \'com/game/toep/model/formatter\'\n\t}"><VBox height="100%" width="100%" alignItems="Center" justifyContent="Center"><Title\n            titleStyle="H1"\n            text="{i18n>tutorial}"\n            textAlign="Center"\n            class="sapUiLargeMarginBottom cursive"\n        /></VBox></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
