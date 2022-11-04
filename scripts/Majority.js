import ElectoralSystem from "./ElectoralSystem.js";

export default class Majority extends ElectoralSystem {
    constructor(votes, parties, chairs) {
        super(votes, parties, chairs);
    }
    computeElected() {
        let candidates = this.parties.map(p => p.candidates.map(p => p)).flat();
        candidates.forEach(c => {
            c.votes = this.votes.map(vote => vote === c.number ? 1 : 0).reduce((a, b) => a + b, 0);
        });
        let descending = (a, b) => b.votes - a.votes;
        candidates.sort(descending);
        let chairs = this.CHAIRS;
        candidates.forEach(c => {
            if(chairs > 0) {
                c.elected = true;
                chairs--;
            }
        });
        return candidates;
    }
}