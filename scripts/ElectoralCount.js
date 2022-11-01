import Database from "./Database.js";
import Proporcional from "./Proporcional.js";

class Polling {
    constructor() {
        this.conn = null;
    }
    updateTables(data) {
        let p = new Proporcional(data, 5);
        let candidates = p.computeElected();
        let resultCandidatos = "", resultPartidos = "";
        candidates.forEach(x => {
            let style = x.elected ? " class='elected'" : "";
            resultCandidatos += `<tr${style}><td>${x.name}</td><td>${x.number}</td><td>${x.votes}</td></tr>`;
        });
        data.forEach(x => {
            if (x.abbr || x.number === 96 || x.number === 97) {
                resultPartidos += `<tr><td>${x.label}</td><td>${x.abbr || ""}</td><td>${x.number}</td><td>${x.votes}</td></tr>`;
            }
        });
        let tableCandidates = document.querySelector("tbody");
        tableCandidates.innerHTML = resultCandidatos;
        let tableParties = document.querySelector("table + table tbody");
        tableParties.innerHTML = resultPartidos;
    }
    init() {
        this.conn = new Database();
        this.conn.init(() => this.conn.listAll(this.updateTables));
    }
}
let p = new Polling();
p.init();