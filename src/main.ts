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

const lautsprecherKatalog: Lautsprecher[] = [
    {id: 1, artikel: "Biamp CM20DT", typ: "Decke", abgriffe: [3, 6, 12, 15]},
    {id: 2, artikel: "Yamaha VXC5F", typ: "Decke", abgriffe: [7.5, 15, 30]},
    {id: 3, artikel: "Yamaha VXC8", typ: "Decke", abgriffe: [15, 30, 60]},
    {id: 4, artikel: "Yamaha VXS5", typ: "Wand", abgriffe: [7.5, 15, 30]},
    {id: 5, artikel: "Yamaha VXS8", typ: "Wand", abgriffe: [15, 30, 60]},
    {id: 6, artikel: "JBL SB2210", typ: "Subwoofer", abgriffe: [30, 60, 120]},
    {id: 7, artikel: "Yamaha VXS10S", typ: "Subwoofer", abgriffe: [15, 30, 60]}
];

const verstaerkerKatalog: Verstaerker[] = [
    {id: 1, artikel: "Crown CTD8125", kanaele: 8, leistung: 125},
    {id: 2, artikel: "Yamaha XMV4280", kanaele: 4, leistung: 280},
    {id: 3, artikel: "Crown CDI4-300", kanaele: 4, leistung: 300}
];

// DOM-Elemente

function holeElement<T extends Element>(selektor: string): T {
    const element = document.querySelector<T>(selektor);

    if(!element) {
        throw new Error(`Element "${selektor}" wurde nicht gefunden.`);
    }

    return element;
}

const lautsprecherAuswahl = holeElement<HTMLSelectElement>("#lautsprecher-auswahl");
const abgriffAuswahl = holeElement<HTMLSelectElement>("#abgriff-auswahl");

function erstelleLautsprecherOptionen(katalog: Lautsprecher[]): string {
    return katalog
        .map((l) => `<option value="${l.id}">{l.artikel} (${l.typ})</option>`)
        .join("");
}

function findeLautsprecher(id: number, katalog: Lautsprecher[]): Lautsprecher | undefined {
    return katalog.find((l) => l.id === id);
}

function erstelleAbgriffOptionen(ls: Lautsprecher): string {
    return ls.abgriffe
        .map((watt) => `<option value="${watt}">${watt.toLocaleString("de-DE")} W</option>`)
        .join("");
}

function aktualisiereAbgriffe(): void {
    const gewaehlt = findeLautsprecher(Number(lautsprecherAuswahl.value), lautsprecherKatalog);
    if (gewaehlt) {
        abgriffAuswahl.innerHTML = erstelleAbgriffOptionen(gewaehlt);
    }
}

// Start

lautsprecherAuswahl.innerHTML = erstelleLautsprecherOptionen(lautsprecherKatalog);
aktualisiereAbgriffe();

lautsprecherAuswahl.addEventListener("change", aktualisiereAbgriffe);