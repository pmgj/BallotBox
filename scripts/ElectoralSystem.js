export default class ElectoralSystem {
    constructor(votes, parties, candidates, chairs) {
        this.votes = votes;
        this.parties = parties;
        this.candidates = candidates;
        this.CHAIRS = chairs;
        this.BRANCO = 96;
        this.NULO = 97;
    }
}