import Database from "./Database.js";

class BallotBox {
    constructor() {
        this.index = 0;
        this.number = 0;
        this.conn = null;
    }
    addNumber(num) {
        if (this.index <= 3) {
            let spans = document.querySelectorAll("h2 span");
            spans[this.index++].textContent = num;
        }
    }
    correct() {
        let spans = document.querySelectorAll("h2 span");
        for (let span of spans) {
            span.innerHTML = "&nbsp;";
        }
        this.index = 0;
        this.writeMessage("");
    }
    writeMessage(msg) {
        let p = document.querySelector("#name");
        p.textContent = msg;
    }
    go(evt) {
        let input = evt.currentTarget;
        let h2 = document.querySelector("h2");
        switch (input.value) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addNumber(input.value);
                this.number = parseInt(h2.textContent.split(' ').join(''));
                this.conn.getVotes(this.number, e => this.writeMessage(e ? e.name || e.label : ""));
                break;
            case 'Branco':
                this.writeMessage("Branco");
                this.number = 96;
                break;
            case 'Corrige':
                this.correct();
                break;
            case 'Confirma':
                this.registerEvents(false);
                this.computeVote(this.number);
                this.writeMessage("Vote computed successfully!");
                setTimeout(() => {
                    this.correct();
                    this.registerEvents(true);
                }, 2000);
                break;
        }
    }
    registerEvents(reg) {
        let botoes = document.querySelectorAll("input:enabled[type='button']");
        botoes.forEach(e => reg ? e.onclick = this.go.bind(this) : e.onclick = null);
    }
    computeVote(number) {
        this.conn.getVotes(number, obj => {
            if (obj) {
                obj.votes = obj.votes + 1;
                this.conn.updateVote(obj);
            } else {
                this.computeVote(97);
            }
        });
    }
    createInitialValues() {
        let data = [
            { label: "Progressistas", number: 11, abbr: "PP", votes: 0 },
            { label: "Podemos", number: 19, abbr: "PODE", votes: 0 },
            { label: "Partido Liberal", number: 22, abbr: "PL", votes: 0 },
            { label: "Partido Novo", number: 30, abbr: "NOVO", votes: 0 },
            { label: "Partido Verde", number: 43, abbr: "PV", votes: 0 },
            { label: "Branco", number: 96, abbr: "BRANCO", votes: 0 },
            { label: "Nulo", number: 97, abbr: "NULO", votes: 0 },
            { name: "Alberto Alves", number: 1122, partyNumber: 11, votes: 0 },
            { name: "Bernardo Barros", number: 1133, partyNumber: 11, votes: 0 },
            { name: "Carlos Cavalcanti", number: 1144, partyNumber: 11, votes: 0 },
            { name: "Diogo Dantas", number: 1955, partyNumber: 19, votes: 0 },
            { name: "Emanuelle Esteves", number: 1999, partyNumber: 19, votes: 0 },
            { name: "Fernanda Ferreira", number: 1900, partyNumber: 19, votes: 0 },
            { name: "Guilherme Gurgel", number: 2222, partyNumber: 22, votes: 0 },
            { name: "Haroldo Hommus", number: 2200, partyNumber: 22, votes: 0 },
            { name: "Ivan Istmo", number: 2265, partyNumber: 22, votes: 0 },
            { name: "Juliana Justos", number: 3030, partyNumber: 30, votes: 0 },
            { name: "Karol Konca", number: 3000, partyNumber: 30, votes: 0 },
            { name: "Luciana Lemos", number: 3033, partyNumber: 30, votes: 0 },
            { name: "Mario Mendes", number: 4333, partyNumber: 43, votes: 0 },
            { name: "Noemi Noruega", number: 4300, partyNumber: 43, votes: 0 },
            { name: "Otávio Orlando", number: 4343, partyNumber: 43, votes: 0 }
        ];
        // Random number of votes
        for (let d of data) {
            d.votes = this.getRandomInt(0, 20);
        }
        // Add to the database
        for (let v of data) {
            this.conn.insertOption(v);
        }
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    init() {
        this.registerEvents(true);
        this.conn = new Database();
        this.conn.init(this.createInitialValues.bind(this));
    }
}
let bb = new BallotBox();
bb.init();