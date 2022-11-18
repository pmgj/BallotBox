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
                    this.conn.getParty(this.number, e => {
                        if (e) {
                            this.writeMessage(e.name);
                        } else {
                            this.writeMessage("Inexistent Party");
                        }
                    });
                }
                if (text.length === 4) {
                    this.conn.getCandidate(this.number, e => {
                        if (e) {
                            this.writeMessage(e.name);
                        } else {
                            this.writeMessage("Inexistent Candidate");
                        }
                    });
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
    createInitialValues() {
        let parties = [
            { name: "Progressistas", number: 11, abbr: "PP" },
            { name: "Partido Democrático Trabalhista", number: 12, abbr: "PDT" },
            { name: "Partido dos Trabalhadores", number: 13, abbr: "PT" },
            { name: "Partido Trabalhista Brasileiro", number: 14, abbr: "PTB" },
            { name: "Movimento Democrático Brasileiro", number: 15, abbr: "MDB" }
        ];
        for (let v of parties) {
            this.conn.insertParty(v);
        }
        let candidates = [
            { name: "Guilherme Gurgel", number: 1110 },
            { name: "Haroldo Hommus", number: 1120 },
            { name: "Ivan Istmo", number: 1130 },
            { name: "Juliana Justos", number: 1140 },
            { name: "Karol Konca", number: 1150 },
            { name: "Luciana Lemos", number: 1210 },
            { name: "Mário Mendes", number: 1220 },
            { name: "Noemi Noruega", number: 1230 },
            { name: "Otávio Orlando", number: 1240 },
            { name: "Arnaldo Antunes", number: 1250 },
            { name: "Bruno Barreto", number: 1310 },
            { name: "Carla Camuratti", number: 1320 },
            { name: "Daniel Dantas", number: 1330 },
            { name: "Emanuella Esteves", number: 1340 },
            { name: "Fábio Farias", number: 1350 },
            { name: "Pedro Parente", number: 1410 },
            { name: "Renata Rueda", number: 1420 },
            { name: "Sandra Sá", number: 1430 },
            { name: "Túlio Telhada", number: 1440 },
            { name: "Ubaldo Uchôa", number: 1450 },
            { name: "Vânia Valadares", number: 1510 },
            { name: "Camila Cavalcanti", number: 1520 },
            { name: "Maria Monteiro", number: 1530 },
            { name: "Marcos Monteiro", number: 1540 },
            { name: "Gustavo Gomes", number: 1550 }
        ];
        for (let v of candidates) {
            this.conn.insertCandidate(v);
        }
        let votes = [1510, 1140, 1450, 1130, 1110, 15, 1450, 1230, 12, 1140, 12, 1310, 1430, 1110, 1250, 1510, 13, 1150, 13, 1430, 1520, 1240, 1330, 14, 1410, 14, 1250, 1430, 1130, 1450, 14, 1430, 1230, 1440, 11, 1220, 1550, 1150, 13, 13, 1240, 1150, 1320, 12, 1420, 13, 1230, 1540, 11, 11, 14, 1440, 1550, 1430, 13, 11, 1150, 1440, 13, 12, 1350, 12, 1250, 1250, 1350, 14, 13, 1510, 1140, 1440, 1450, 1120, 12, 1530, 1130, 13, 15, 1530, 1520, 12, 1330, 1240, 1210, 1540, 1330, 15, 14, 1540, 1240, 1530, 1130, 1150, 13, 11, 1240, 1150, 1520, 15, 1550, 1450, 90, 96];
        for (let v of votes) {
            this.conn.insertVote(v);
        }
    }
    async init() {
        this.registerEvents(true);
        this.conn = new Database();
        await new Promise(this.conn.init.bind(this.conn));
        // this.createInitialValues();
    }
}
let bb = new GUI();
bb.init();