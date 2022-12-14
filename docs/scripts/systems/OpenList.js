import ElectoralSystem from "./ElectoralSystem.js";

export default class OpenList extends ElectoralSystem {
    constructor(votes, parties, candidates, chairs) {
        super(votes, parties, candidates, chairs);
    }
    computeChairs() {
        let partiesVotes = [], numValidVotes = 0;
        this.parties.forEach(p => {
            let cNumbers = this.candidates.filter(c => c.number.toString().substring(0, 2) == p.number).map(c => c.number);
            let temp = this.votes.map(vote => vote === p.number || cNumbers.includes(vote) ? 1 : 0).reduce((a, b) => a + b, 0);
            partiesVotes.push({ number: p.number, votes: temp });
            numValidVotes += temp;
        });
        let electoralQuotient = Math.round(numValidVotes / this.CHAIRS);
        partiesVotes.forEach(v => v.chairs = Math.floor(v.votes / electoralQuotient));
        let sum = partiesVotes.reduce((a, b) => a + b.chairs, 0);
        for (let i = 0; i < this.CHAIRS - sum; i++) {
            let biggestAverage = 0.0;
            let index = 0;
            for (let j = 0; j < partiesVotes.length; j++) {
                let average = partiesVotes[j].votes / (partiesVotes[j].chairs + 1);
                if (average > biggestAverage) {
                    biggestAverage = average;
                    index = j;
                }
            }
            partiesVotes[index].chairs++;
        }
        return partiesVotes;
    }
    computeElected() {
        let partiesVotes = this.computeChairs();
        let candidates = this.candidates.map(c => new Object({ name: c.name, number: c.number, votes: this.votes.map(vote => vote === c.number ? 1 : 0).reduce((a, b) => a + b, 0) }));
        candidates.sort(this.descending);
        partiesVotes.forEach(pv => {
            let chairs = pv.chairs;
            let number = pv.number;
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