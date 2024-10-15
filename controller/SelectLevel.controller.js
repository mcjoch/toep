"use strict";sap.ui.define(["sap/ui/model/json/JSONModel","./BaseController","../util/StorageManager","../util/SoundManager"],function(e,t,o,n){"use strict";function s(e){return e&&e.__esModule&&typeof e.default!=="undefined"?e.default:e}const r=s(t);const a=o["StorageManager"];const c=n["SoundManager"];const i=r.extend("com.game.toep.controller.SelectLevel",{constructor:function e(){r.prototype.constructor.apply(this,arguments);this.onRouteMatched=()=>{const e=this.getModel("viewModel");e.setProperty("/playerName",a.getName());e.setProperty("/playerCoins",a.getCoins());c.playMusic("intro")}},onInit:function t(){this.getRouter().getRoute("selectlevel").attachPatternMatched(this.onRouteMatched,this);const o=new e({playerName:"",playerCoins:0});this.setModel(o,"viewModel")},onPressStart:function e(t){const o=t.getSource();const n=o.getBindingContext("config");const s=n.getObject();this.getRouter().navTo("game",{level:s.key})}});return i});
//# sourceMappingURL=SelectLevel.controller.js.map