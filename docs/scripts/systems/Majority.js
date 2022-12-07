import ElectoralSystem from "./ElectoralSystem.js";

export default class Majority extends ElectoralSystem {
    constructor(votes, parties, candidates, chairs) {
        super(votes, parties, candidates, chairs);
    }
    computeElected() {
        let candidates = this.candidates.map(c => new Object({name: c.name, number: c.number, votes: this.votes.map(vote => vote === c.number ? 1 : 0).reduce((a, b) => a + b, 0)}));
        candidates.sort(this.descending);
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