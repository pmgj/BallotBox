export default class Proporcional {
    constructor(data, chairs) {
        this.data = data;
        this.CHAIRS = chairs;
        this.BRANCO = 96;
        this.NULO = 97;
    }
    computeChairs() {
        let parties = [];
        let tempParties = this.data.filter(p => p.abbr);
        tempParties.forEach(p => {
            let temp = this.data.map(item => Math.floor(item.number / 100) === p.number ? item.votes : 0).reduce((a, b) => a + b, 0);
            parties.push({ number: p.number, votes: temp + p.votes });
        });
        let numValidVotes = this.data.map(item => item.number !== this.BRANCO && item.number !== this.NULO ? item.votes : 0).reduce((a, b) => a + b, 0);
        let electoralQuotient = Math.round(numValidVotes / this.CHAIRS);
        let sum = parties.map(v => {
            let qp = Math.floor(v.votes / electoralQuotient);
            v.chairs = qp;
            return qp;
        }).reduce((a, b) => a + b, 0);
        for (let i = 0; i < this.CHAIRS - sum; i++) {
            let biggestAverage = 0.0;
            let index = 0;
            for (let j = 0; j < parties.length; j++) {
                let average = parties[j].votes / (parties[j].chairs + 1);
                if (average > biggestAverage) {
                    biggestAverage = average;
                    index = j;
                }
            }
            parties[index].chairs++;
        }
        return parties;
    }
    computeElected() {
        let chairs = this.computeChairs();
        let candidates = this.data.filter(v => v.partyNumber && v.partyNumber !== this.BRANCO && v.partyNumber !== this.NULO);
        let descending = (a, b) => b.votes - a.votes;
        candidates.sort(descending);
        chairs.forEach(pi => {
            let chairs = pi.chairs;
            let number = pi.number;
            for (let c of candidates) {
                if (Math.floor(c.number / 100) === number && chairs > 0) {
                    c.elected = true;
                    chairs--;
                }
            }
        });
        return candidates;
    }
}
let data = [
    { label: "Partido Liberal", number: 22, abbr: "PL", votes: 690 },
    { label: "Partido Novo", number: 30, abbr: "NOVO", votes: 300 },
    { label: "Partido Verde", number: 43, abbr: "PV", votes: 130 },
    { name: "Guilherme Gurgel", number: 2222, partyNumber: 22, votes: 1500 },
    { name: "Haroldo Hommus", number: 2200, partyNumber: 22, votes: 1800 },
    { name: "Ivan Istmo", number: 2265, partyNumber: 22, votes: 2100 },
    { name: "Juliana Justos", number: 3030, partyNumber: 30, votes: 1720 },
    { name: "Karol Konca", number: 3000, partyNumber: 30, votes: 1600 },
    { name: "Luciana Lemos", number: 3033, partyNumber: 30, votes: 800 },
    { name: "Mario Mendes", number: 4333, partyNumber: 43, votes: 215 },
    { name: "Noemi Noruega", number: 4300, partyNumber: 43, votes: 500 },
    { name: "Otávio Orlando", number: 4343, partyNumber: 43, votes: 100 },
    { name: "Branco", number: 96, partyNumber: 96, votes: 6 },
    { name: "Nulo", number: 97, partyNumber: 96, votes: 9 }
];

let p = new Proporcional(data, 5);
p.computeElected();