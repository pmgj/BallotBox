import Database from "./Database.js";

class GUI {
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
                let text = h2.textContent.split(' ').join('').trimEnd();
                this.number = parseInt(text);
                this.writeMessage("");
                if (text.length === 2) {
                    this.conn.getParty(this.number, e => this.writeMessage(e ? e.name : "Inexistent Party"));
                }
                if (text.length === 4) {
                    this.conn.getCandidate(this.number, e => this.writeMessage(e ? e.name : "Inexistent Candidate"));
                }
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
        this.conn.insertVote(number);
    }
    async init() {
        this.registerEvents(true);
        this.conn = new Database();
        await new Promise(this.conn.init.bind(this.conn));
    }
}
let bb = new GUI();
bb.init();