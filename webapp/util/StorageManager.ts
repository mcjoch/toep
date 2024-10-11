import Storage from "sap/ui/util/Storage";


/**
 * @namespace com.game.toep.util
 */
export default class StorageManagerClass {

    storage: Storage;

    constructor() {
        this.storage = new Storage(Storage.Type.local, "toep_storage");
    }

    public setName(name: string): void {
        this.storage.put("player_name", name);
    }

    public getName(): string {
        return this.storage.get("player_name") as string;
    }

    public setCoins(coins: int): void {
        this.storage.put("player_coins", coins);
    }
    
    public getCoins(): int {
        return this.storage.get("player_coins") as int;
    }   

}

// App-wise singleton
export const StorageManager= new StorageManagerClass();