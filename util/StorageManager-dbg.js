"use strict";

sap.ui.define(["sap/ui/util/Storage"], function (Storage) {
  "use strict";

  /**
   * @namespace com.game.toep.util
   */
  class StorageManagerClass {
    constructor() {
      this.storage = new Storage(Storage.Type.local, "toep_storage");
    }
    setName(name) {
      this.storage.put("player_name", name);
    }
    getName() {
      return this.storage.get("player_name");
    }
    setCoins(coins) {
      this.storage.put("player_coins", coins);
    }
    getCoins() {
      return this.storage.get("player_coins");
    }
  }

  // App-wise singleton
  const StorageManager = new StorageManagerClass();
  StorageManagerClass.StorageManager = StorageManager;
  return StorageManagerClass;
});