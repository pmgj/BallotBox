import Database from "./Database.js";
import OpenList from "./systems/OpenList.js";

class ElectoralCount {
    constructor() {
        this.conn = null;
    }
    updateTables(votes, candidates, parties) {
        let v = votes.map(v => v.vote);
        let p = new OpenList(v, parties, candidates, 5);
        let elected = p.computeElected();
        let resultCandidatos = "", resultPartidos = "";
        elected.forEach(x => resultCandidatos += `<tr${x.elected ? " class='elected'" : ""}><td>${x.name}</td><td>${x.number}</td><td>${x.votes}</td></tr>`);
        parties.forEach(x => resultPartidos += `<tr><td>${x.name}</td><td>${x.abbr}</td><td>${x.number}</td><td>${v.filter(n => n === x.number).length}</td></tr>`);
        resultPartidos += `<tr><td>Branco</td><td>Branco</td><td>96</td><td>${p.getWhiteVotes()}</td></tr>`;
        resultPartidos += `<tr><td>Nulo</td><td>Nulo</td><td>97</td><td>${p.getNullVotes()}</td></tr>`;
        let tableCandidates = document.querySelector("tbody");
        tableCandidates.innerHTML = resultCandidatos;
        let tableParties = document.querySelector("table + table tbody");
        tableParties.innerHTML = resultPartidos;
    }
    async init() {
        this.conn = new Database();
        await new Promise(this.conn.init.bind(this.conn));
        let votes = await new Promise(this.conn.listVotes.bind(this.conn));
        let candidates = await new Promise(this.conn.listCandidates.bind(this.conn));
        let parties = await new Promise(this.conn.listParties.bind(this.conn));
        this.updateTables(votes, candidates, parties);
    }
}
let p = new ElectoralCount();
p.init();