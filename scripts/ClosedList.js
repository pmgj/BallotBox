import ElectoralSystem from "./ElectoralSystem.js";

export default class ClosedList extends ElectoralSystem {
    constructor(votes, parties, candidates, chairs) {
        super(votes, parties, candidates, chairs);
    }
    computeChairs() {
        let partiesVotes = [], numValidVotes = 0;
        this.parties.forEach(p => {
            let temp = this.votes.map(vote => vote === p.number ? 1 : 0).reduce((a, b) => a + b, 0);
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
        partiesVotes.forEach(pv => {
            let chairs = pv.chairs;
            let candidates = this.candidates.filter(c => c.number === pv.number)[0].candidates;
            for (let c of candidates) {
                if (chairs > 0) {
                    c.elected = true;
                    chairs--;
                }
            }
            pv.candidates = candidates;
        });
        return partiesVotes;
    }
}