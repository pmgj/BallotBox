export default class Database {
    constructor() {
        this.db = null;
        this.DATABASE = "ballotbox";
        this.PARTIES = "parties";
        this.CANDIDATES = "candidates";
        this.VOTES = "votes";
    }
    getObject(store, number, func) {
        let transaction = this.db.transaction(store, "readonly");
        let objectStore = transaction.objectStore(store);
        let request = objectStore.get(number);
        request.onsuccess = e => func(e.target.result);
        request.onerror = this.requestError;
    }
    getParty(number, func) {
        this.getObject(this.PARTIES, number, func);
    }
    getCandidate(number, func) {
        this.getObject(this.CANDIDATES, number, func);
    }
    requestError(e) {
        console.error("Error", e.target.error);
    }
    upgradeDatabase(e) {
        let stores = e.target.result;
        if (!stores.objectStoreNames.contains(this.PARTIES)) {
            stores.createObjectStore(this.PARTIES, { keyPath: 'number' });
        }
        if (!stores.objectStoreNames.contains(this.CANDIDATES)) {
            stores.createObjectStore(this.CANDIDATES, { keyPath: 'number' });
        }
        if (!stores.objectStoreNames.contains(this.VOTES)) {
            stores.createObjectStore(this.VOTES, { keyPath: 'id', autoIncrement: true });
        }
    }
    listVotes(resolve) {
        let transaction = this.db.transaction(this.VOTES, "readonly");
        let store = transaction.objectStore(this.VOTES);
        let request = store.getAll();
        request.onsuccess = e => resolve(e.target.result);
        request.onerror = this.requestError;
    }
    listCandidates(resolve) {
        let transaction = this.db.transaction(this.CANDIDATES, "readonly");
        let store = transaction.objectStore(this.CANDIDATES);
        let request = store.getAll();
        request.onsuccess = e => resolve(e.target.result);
        request.onerror = this.requestError;
    }
    listParties(resolve) {
        let transaction = this.db.transaction(this.PARTIES, "readonly");
        let store = transaction.objectStore(this.PARTIES);
        let request = store.getAll();
        request.onsuccess = e => resolve(e.target.result);
        request.onerror = this.requestError;
    }
    insertOption(store, option) {
        let transaction = this.db.transaction(store, "readwrite");
        let objectStore = transaction.objectStore(store);
        objectStore.add(option);
    }
    insertParty(value) {
        this.insertOption(this.PARTIES, value);
    }
    insertCandidate(value) {
        this.insertOption(this.CANDIDATES, value);
    }
    insertVote(value) {
        this.insertOption(this.VOTES, {vote: value});
    }
    init(func) {
        let openRequest = window.indexedDB.open(this.DATABASE, 1);
        openRequest.onupgradeneeded = this.upgradeDatabase.bind(this);
        openRequest.onerror = this.requestError;
        openRequest.onsuccess = e => {
            this.db = e.target.result;
            func();
        };
    }
}