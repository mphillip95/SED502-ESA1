// Interface definieren für Verstärker und Lautsprecher

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

// Arrays befüllen nach Vorgaben von Interface

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

// Vestärker Allgemein Eigenschaften und Reserve setzen
const RESERVEFAKTOR = 1.2;
const NENNSPANNUNG = 100;

// leere Liste für Lautsprecherauswahl
let planung: Position[] = [];

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

const formular = holeElement<HTMLFormElement>("#planer-formular");
const anzahlEingabe = holeElement<HTMLInputElement>("#anzahl");
const liste = holeElement<HTMLUListElement>("#lautsprecher-liste");
const ergebnis = holeElement<HTMLParagraphElement>("#ergebnis");

function erstelleLautsprecherOptionen(katalog: Lautsprecher[]): string {
    return katalog
        .map((l) => `<option value="${l.id}">${l.artikel} (${l.typ})</option>`)
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

// Berechnungsfunktion für Verstärkerauswahl

function berechneGesamtleistung(positionen: Position[]): number {
    return positionen.reduce((summe, p) => summe + p.abgriff * p.anzahl, 0);
}

// Impedanzberechnung: Formel U² / P
function berechneImpedanz(leistung: number): number {
    return (NENNSPANNUNG * NENNSPANNUNG) / leistung;
}

// Verstärker finden
function findeVerstaerker(leistung: number, katalog: Verstaerker[]): Verstaerker | undefined {
    return katalog.find((v) => v.leistung >= leistung * RESERVEFAKTOR);
}

// Zahl formatieren
function formatiere(zahl: number): string {
    return zahl.toLocaleString("de-DE", {maximumFractionDigits: 1})
}

function erstelleListenEintraege(positionen: Position[]): string {
    return positionen
        .map((p, index) => `
            <button type="button" data-index="${index}" aria-label="{p.lautsprecher.artikel} entfernen">Entfernen</button>
            <li>
                ${p.anzahl} x ${p.lautsprecher.artikel} (${formatiere(p.abgriff)} W) = ${formatiere(p.anzahl * p.abgriff)} W
            </li>`)
        .join("");
}

function erstelleErgebnisText(positionen: Position[]): string {
    if (positionen.length === 0) {
        return "Noch keine Lautsprecher hinzugefügt!";
    }

    const leistung = berechneGesamtleistung(positionen);
    const impedanz = berechneImpedanz(leistung);
    const benoetigt = leistung * RESERVEFAKTOR;
    const passend = findeVerstaerker(leistung, verstaerkerKatalog);

    const empfehlung = passend
        ? `Empfohlener Verstärker: ${passend.artikel} (${passend.kanaele} x ${passend.leistung} W).`
        : "Kein Verstärker in der hinterlegten Liste hat genügend Leistung. Teilen Sie die Lautsprecher auf mehrere Kanäle auf.";
    
    return `Gesamtleistung: ${formatiere(leistung)} W . Lastimpedanz: ${formatiere(impedanz)} Ohm . Benötigt inkl. 20% Reserve: ${formatiere(benoetigt)} W. ${empfehlung}`;
}

// Liste und Ergebnis auf der Seite aktualisieren
function zeigePlanung(): void {
    liste.innerHTML = erstelleListenEintraege(planung);
    ergebnis.textContent = erstelleErgebnisText(planung);

}

// Neue Lautsprecher zur Planung hinzufügen
function neuePosition(event: SubmitEvent): void {
    event.preventDefault();

    const gewaehlt = findeLautsprecher(Number(lautsprecherAuswahl.value), lautsprecherKatalog);
    const abgriff = Number(abgriffAuswahl.value);
    const anzahl = Number(anzahlEingabe.value);

    if (!gewaehlt || anzahl < 1) {
        return;
    }

    planung = [...planung, { lautsprecher: gewaehlt, abgriff, anzahl}];
    zeigePlanung();
}

// Eintrag entfernen nach Position
function entfernePosition(index: number): void {
    planung = planung.filter((_, i) => i !== index);
    zeigePlanung();
}


// Start

lautsprecherAuswahl.innerHTML = erstelleLautsprecherOptionen(lautsprecherKatalog);
aktualisiereAbgriffe();

lautsprecherAuswahl.addEventListener("change", aktualisiereAbgriffe);

formular.addEventListener("submit", neuePosition);

liste.addEventListener("click", (event) => {
    const ziel = event.target;
    if (ziel instanceof HTMLButtonElement && ziel.dataset.index !== undefined) {
        entfernePosition(Number(ziel.dataset.index));
    }
});