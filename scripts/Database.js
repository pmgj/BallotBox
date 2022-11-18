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
            const objectStore = stores.createObjectStore(this.PARTIES, { keyPath: 'number' });
            let parties = [
                { name: "Progressistas", number: 11, abbr: "PP" },
                { name: "Partido Democrático Trabalhista", number: 12, abbr: "PDT" },
                { name: "Partido dos Trabalhadores", number: 13, abbr: "PT" },
                { name: "Partido Trabalhista Brasileiro", number: 14, abbr: "PTB" },
                { name: "Movimento Democrático Brasileiro", number: 15, abbr: "MDB" }
            ];
            for (let v of parties) {
                objectStore.add(v);
            }
        }
        if (!stores.objectStoreNames.contains(this.CANDIDATES)) {
            const objectStore = stores.createObjectStore(this.CANDIDATES, { keyPath: 'number' });
            let candidates = [
                { name: "Guilherme Gurgel", number: 1110 },
                { name: "Haroldo Hommus", number: 1120 },
                { name: "Ivan Istmo", number: 1130 },
                { name: "Juliana Justos", number: 1140 },
                { name: "Karol Konca", number: 1150 },
                { name: "Luciana Lemos", number: 1210 },
                { name: "Mário Mendes", number: 1220 },
                { name: "Noemi Noruega", number: 1230 },
                { name: "Otávio Orlando", number: 1240 },
                { name: "Arnaldo Antunes", number: 1250 },
                { name: "Bruno Barreto", number: 1310 },
                { name: "Carla Camuratti", number: 1320 },
                { name: "Daniel Dantas", number: 1330 },
                { name: "Emanuella Esteves", number: 1340 },
                { name: "Fábio Farias", number: 1350 },
                { name: "Pedro Parente", number: 1410 },
                { name: "Renata Rueda", number: 1420 },
                { name: "Sandra Sá", number: 1430 },
                { name: "Túlio Telhada", number: 1440 },
                { name: "Ubaldo Uchôa", number: 1450 },
                { name: "Vânia Valadares", number: 1510 },
                { name: "Camila Cavalcanti", number: 1520 },
                { name: "Maria Monteiro", number: 1530 },
                { name: "Marcos Monteiro", number: 1540 },
                { name: "Gustavo Gomes", number: 1550 }
            ];
            for (let v of candidates) {
                objectStore.add(v);
            }
        }
        if (!stores.objectStoreNames.contains(this.VOTES)) {
            const objectStore = stores.createObjectStore(this.VOTES, { keyPath: 'id', autoIncrement: true });
            let votes = [1510, 1140, 1450, 1130, 1110, 15, 1450, 1230, 12, 1140, 12, 1310, 1430, 1110, 1250, 1510, 13, 1150, 13, 1430, 1520, 1240, 1330, 14, 1410, 14, 1250, 1430, 1130, 1450, 14, 1430, 1230, 1440, 11, 1220, 1550, 1150, 13, 13, 1240, 1150, 1320, 12, 1420, 13, 1230, 1540, 11, 11, 14, 1440, 1550, 1430, 13, 11, 1150, 1440, 13, 12, 1350, 12, 1250, 1250, 1350, 14, 13, 1510, 1140, 1440, 1450, 1120, 12, 1530, 1130, 13, 15, 1530, 1520, 12, 1330, 1240, 1210, 1540, 1330, 15, 14, 1540, 1240, 1530, 1130, 1150, 13, 11, 1240, 1150, 1520, 15, 1550, 1450, 90, 96];
            for (let v of votes) {
                objectStore.add({ vote: v });
            }
        }
    }
    listVotes(resolve) {
        this.list(this.VOTES, resolve);
    }
    listCandidates(resolve) {
        this.list(this.CANDIDATES, resolve);
    }
    listParties(resolve) {
        this.list(this.PARTIES, resolve);
    }
    list(store, resolve) {
        let transaction = this.db.transaction(store, "readonly");
        let objectStore = transaction.objectStore(store);
        let request = objectStore.getAll();
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
        this.insertOption(this.VOTES, { vote: value });
    }
    init(resolve) {
        let openRequest = window.indexedDB.open(this.DATABASE, 1);
        openRequest.onupgradeneeded = this.upgradeDatabase.bind(this);
        openRequest.onerror = this.requestError;
        openRequest.onsuccess = e => {
            this.db = e.target.result;
            resolve();
        };
    }
}