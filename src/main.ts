interface Verstaerker {
    id: number;
    artikel: string;
    kanaele: number;
    leistung: number;
}

interface Lautsprecher {
    id: number;
    artikel: string;
    typ: "Decke" | "Wand" | "Subwoofer";
    abgriffe: number[];
}

interface Position {
    lautsprecher: Lautsprecher;
    abgriff: number;
    anzahl: number;
}

const lautsprecher: Lautsprecher[] = [
    {id: 1, artikel: "Biamp CM20DT", typ: "Decke", abgriffe: [3, 6, 12, 15]},
    {id: 2, artikel: "Yamaha VXC5F", typ: "Decke", abgriffe: [7.5, 15, 30]},
    {id: 3, artikel: "Yamaha VXC8", typ: "Decke", abgriffe: [15, 30, 60]},
    {id: 4, artikel: "Yamaha VXS5", typ: "Wand", abgriffe: [7.5, 15, 30]},
    {id: 5, artikel: "Yamaha VXS8", typ: "Wand", abgriffe: [15, 30, 60]},
    {id: 6, artikel: "JBL SB2210", typ: "Subwoofer", abgriffe: [30, 60, 120]},
    {id: 7, artikel: "Yamaha VXS10S", typ: "Subwoofer", abgriffe: [15, 30, 60]}
]

const verstaerker: Verstaerker[] = [
    {id: 1, artikel: "Crown CTD8125", kanaele: 8, leistung: 125},
    {id: 2, artikel: "Yamaha XMV4280", kanaele: 4, leistung: 280},
    {id: 3, artikel: "Crown CDI4-300", kanaele: 4, leistung: 300}
]

