# Professionelle Beschallung - 100V-Technik & Dante

Informationsseite zur professionellen Beschallungstechnik mit einem interaktiven 100V-Anlagenplaner
ESA1 der Lehrveranstaltung SED502, Ferdinand Porsche FernFH

**Live-Version:** https://ubiquitous-croquembouche-bb15f0.netlify.app/

## Inhalt der Webseite

- Grundlagen der 100V-Technik
- Verstärkertypen aufgelistet
- Dante Audio
- **100V-Anlagenplaner:** Es können Lautsprecher mit Abgriffen (in Watt) ausgewählt werden, woraufhin ein passender Verstärker gefunden wird. 

## Technische Entscheidungen

### Semantisches HTML

Die Seite ist vollständig mit semantischen Elementen aufgebaut: `header`, `nav` `main`, `section`, `article`, `aside`, `figure`, `footer`. Auf div-Elemente wurde verzichtet. 

### Accessibility und ARIA

- Die Navigation hat das `aria-label"Hauptnavigation"`
- Jede section ist über aria-labelledby mit der Überschrift verknüpft
- Der Sicherheitshinweis hat ein eigenes aria-label (aside)
- Das Ergebnis des Planers steht in einem aria-live="polite" Element und wird von Screenreadern automatisch vorgelesen
- dynamisch erzeugte Entfernen Button haben ein aria-label mit dem Produktnamen + entfernen
- Formularfelder haben ein for/id verknüpftes label
- Bilder haben beschreibende alt-Attribute
- Für Tastaturnutzer ist der Fokus mit :focus-visible sichtbar

Lighthouse- Accessibility-Score **100* (siehe `lighthouse.png`).

### TypeScript

#### Interfaces
- Lautsprecher: Produkt mit verfügbaren Leistungsabgriffen. Der Typ ist ein Union Type (Decke, Wand, Subwoofer)
- Verstaerker: Produkt mit Kanalanazhl und Leistung pro Kanal
- Position: Für die Planung, ein Eintrag für Lautsprecher, gewählter Abgriff, Anzahl

#### Funktionen

Alle Funktionen haben typisierte Parameter und Rückgabewerte. Folgende Array-Methoden wurden eingesetzt: 

- map
- find
- reduce
- filter

### Logik des Planers

Die Lautsprecher in ihrer Anzahl und Abgriffen können hinzugefügt werden. 
Es wird die Summe über alle Lautsprecher * Abgriffen gebildet + 20% Leistungsreserve. 
Der Verstärker mit der nötigen Leistung wird ermittelt und angezeigt. 

### Build und Deployment

TypeScript wird mit dem TypeScript-Compiler (tsc) übersetzt. Der Quellcode zu typescript liegt in src/, das kompilierte JavaScript wird in /public/js/ geschrieben und als ES-Modul (type=module) eingebunden. 

Generierter Code ist mittels .gitignore vom Repository ausgeschlossen. 

Die Seite wurde über Netlify deployed. Bei jedem Push auf die Branch main wird automatisch ein npm run build ausgeführt und veröffentlicht. 

Die Build-Einstellungen sind in der `netlify.toml`ersichtlich. 

## Lokal starten

npm install
npm run build

Danach kann `public/index.html` mit einem lokalen Webserver geöffnet werden. 

## Bildquellen

- Prinzip der 100V-Technik: Thomann
- Dante-Wandpanel: TurtleAV

