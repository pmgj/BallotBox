export default class Database {
    constructor() {
        this.db = null;
        this.STORE_NAME = "ballotbox";
    }
    getVotes(id, func) {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.get(id);
        request.onsuccess = e => func(e.target.result);
        request.onerror = this.requestError;
    }
    updateVote(option) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.put(option);
        request.onerror = this.requestError;
    }
    requestError(e) {
        console.error("Error", e.target.error);
    }
    upgradeDatabase(e) {
        let stores = e.target.result;
        if (!stores.objectStoreNames.contains(this.STORE_NAME)) {
            stores.createObjectStore(this.STORE_NAME, { keyPath: 'number' });
        }
    }
    listAll(func) {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.getAll();
        request.onsuccess = e => func(e.target.result);
        request.onerror = this.requestError;
    }
    insertOption(option) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        store.add(option);
    }
    init(func) {
        let openRequest = window.indexedDB.open(this.STORE_NAME, 1);
        openRequest.onupgradeneeded = this.upgradeDatabase.bind(this);
        openRequest.onerror = this.requestError;
        openRequest.onsuccess = e => {
            this.db = e.target.result;
            func();
        };
    }
}