import Storage from "sap/ui/util/Storage";


/**
 * @namespace com.game.toep.util
 */
export default class StorageManagerClass {

    storage: Storage;

    constructor() {
        this.storage = new Storage(Storage.Type.local, "toep_storage");
    }

    public set(key: string, value: string): void {
        this.storage.put(key, value);
    }

    public get(key: string): string {
        return this.storage.get(key) as string;
    }

}

// App-wise singleton
export const StorageManager= new StorageManagerClass();