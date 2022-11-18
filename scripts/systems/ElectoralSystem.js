export default class ElectoralSystem {
    constructor(votes, parties, candidates, chairs) {
        this.votes = votes;
        this.parties = parties;
        this.candidates = candidates;
        this.CHAIRS = chairs;
        this.BRANCO = 96;
        this.NULO = 97;
    }
    descending(a, b) {
        return b.votes - a.votes;
    }
    getNullVotes() {
        let partyNumbers = this.parties.map(p => p.number);
        let candidatesNumbers = this.candidates.map(p => p.number);
        let numbers = [...partyNumbers, ...candidatesNumbers, 96];
        return this.votes.filter(v => !numbers.includes(v)).length;
    }
    getWhiteVotes() {
        return this.votes.filter(n => n === 96).length;
    }
}