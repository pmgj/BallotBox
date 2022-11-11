import OpenList from "./OpenList.js";
import ClosedList from "./ClosedList.js";
import Majority from "./Majority.js";

class Test {
    constructor() {
        this.parties = [
            { name: "Progressistas", number: 11, abbr: "PP" },
            { name: "Partido Democrático Trabalhista", number: 12, abbr: "PDT" },
            { name: "Partido dos Trabalhadores", number: 13, abbr: "PT" },
            { name: "Partido Trabalhista Brasileiro", number: 14, abbr: "PTB" },
            { name: "Movimento Democrático Brasileiro", number: 15, abbr: "MDB" }
        ];
    }
    test1() {
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
        let votes = [1510, 1140, 1450, 1130, 1110, 15, 1450, 1230, 12, 1140, 12, 1310, 1430, 1110, 1250, 1510, 13, 1150, 13, 1430, 1520, 1240, 1330, 14, 1410, 14, 1250, 1430, 1130, 1450, 14, 1430, 1230, 1440, 11, 1220, 1550, 1150, 13, 13, 1240, 1150, 1320, 12, 1420, 13, 1230, 1540, 11, 11, 14, 1440, 1550, 1430, 13, 11, 1150, 1440, 13, 12, 1350, 12, 1250, 1250, 1350, 14, 13, 1510, 1140, 1440, 1450, 1120, 12, 1530, 1130, 13, 15, 1530, 1520, 12, 1330, 1240, 1210, 1540, 1330, 15, 14, 1540, 1240, 1530, 1130, 1150, 13, 11, 1240, 1150, 1520, 15, 1550, 1450, 90, 96];
        let ol = new OpenList(votes, this.parties, candidates, 6);
        let list = ol.computeElected();
        console.table(list);
    }
    test2() {
        let candidates = [
            {
                number: 11, candidates: [
                    { name: "Guilherme Gurgel" },
                    { name: "Haroldo Hommus" },
                    { name: "Ivan Istmo" },
                    { name: "Juliana Justos" },
                    { name: "Karol Konca" }
                ]
            },
            {
                number: 12, candidates: [
                    { name: "Luciana Lemos" },
                    { name: "Mário Mendes" },
                    { name: "Noemi Noruega" },
                    { name: "Otávio Orlando" },
                    { name: "Arnaldo Antunes" }
                ]
            },
            {
                number: 13, candidates: [
                    { name: "Bruno Barreto" },
                    { name: "Carla Camuratti" },
                    { name: "Daniel Dantas" },
                    { name: "Emanuella Esteves" },
                    { name: "Fábio Farias" }
                ]
            },
            {
                number: 14, candidates: [
                    { name: "Pedro Parente" },
                    { name: "Renata Rueda" },
                    { name: "Sandra Sá" },
                    { name: "Túlio Telhada" },
                    { name: "Ubaldo Uchôa" }
                ]
            },
            {
                number: 15, candidates: [
                    { name: "Vânia Valadares" },
                    { name: "Camila Cavalcanti" },
                    { name: "Maria Monteiro" },
                    { name: "Marcos Monteiro" },
                    { name: "Gustavo Gomes" }
                ]
            }
        ];
        let votes = [15, 11, 14, 11, 11, 15, 14, 12, 12, 11, 12, 13, 14, 11, 12, 15, 13, 11, 13, 14, 15, 12, 13, 14, 14, 14, 12, 14, 11, 14, 14, 14, 12, 14, 11, 12, 15, 11, 13, 13, 12, 11, 13, 12, 14, 13, 12, 15, 11, 11, 14, 14, 15, 14, 13, 11, 11, 14, 13, 12, 13, 12, 12, 12, 13, 14, 13, 15, 11, 14, 14, 11, 12, 15, 11, 13, 15, 15, 15, 12, 13, 12, 12, 15, 13, 15, 14, 15, 12, 15, 11, 11, 13, 11, 12, 11, 15, 15, 15, 14, 90, 96];
        let ol = new ClosedList(votes, this.parties, candidates, 6);
        let list = ol.computeElected();
        console.table(list);
    }
    test3() {
        let candidates = [
            { name: "Guilherme Gurgel", number: 11 },
            { name: "Luciana Lemos", number: 12 },
            { name: "Bruno Barreto", number: 13 },
            { name: "Pedro Parente", number: 14 },
            { name: "Vânia Valadares", number: 15 }
        ];
        let votes = [15, 15, 14, 11, 11, 15, 14, 12, 12, 11, 12, 13, 14, 11, 12, 15, 13, 11, 13, 14, 15, 12, 13, 14, 14, 14, 12, 14, 11, 14, 14, 14, 12, 14, 11, 12, 15, 11, 13, 13, 12, 11, 13, 12, 14, 13, 12, 15, 11, 11, 14, 14, 15, 14, 13, 11, 11, 14, 13, 12, 13, 12, 12, 12, 13, 14, 13, 15, 11, 14, 14, 11, 12, 15, 11, 13, 15, 15, 15, 12, 13, 12, 12, 15, 13, 15, 14, 15, 12, 15, 11, 11, 13, 11, 12, 11, 15, 15, 15, 14, 90, 96];
        let ol = new Majority(votes, this.parties, candidates, 2);
        let list = ol.computeElected();
        console.table(list);
    }    
}
let t = new Test();
t.test1();
t.test2();
t.test3();