# Truth Matrix

En interaktiv webbapplikation inspirerad av konceptet "röd piller" och "blå piller" från filmen The Matrix, som låter användare utforska två olika verklighetsuppfattningar.

## Projektbeskrivning

Truth Matrix är ett experimentellt projekt som utforskar hur information presenteras och uppfattas beroende på perspektiv. Webbplatsen ger besökare valet mellan två skilda verklighetsuppfattningar:

- **Röd Pill**: Leder användaren till konspirationsteorier och alternativa "sanningar"
- **Blå Pill**: Leder användaren till konventionella nyheter och etablerade fakta

Denna dubbla presentation skapar en intressant spegling som kan hjälpa besökare att reflektera över hur information presenteras, tolkas och konsumeras i dagens digitala landskap.

## Huvudfunktioner

- **Interaktiv startsida**: Presenterar användaren med ett val mellan röd och blå pill
- **Dynamisk artikelvisning**: Laddar artiklar från JSON-databaser med helt olika innehåll och ton beroende på användarens val
- **Avancerade visuella effekter**: Olika designspråk för de två olika versionerna förstärker känslan av separata verkligheter
- **Kommentarssystem**: Visar olika typer av kommentarer beroende på vilken "värld" användaren valt
- **Sökfunktionalitet**: Låter användaren hitta innehåll inom sin valda verklighet
- **Responsiv design**: Fungerar på alla skärmstorlekar

## Teknikstack

- **Frontend**: Rent HTML, CSS och JavaScript utan ramverk
- **Datahantering**: Lokala JSON-filer för artiklar och kommentarer
- **Interaktivitet**: Vanilla JavaScript med modulära, återanvändbara komponenter
- **Design**: Modern CSS med flexbox, grid, animationer och övergångar

## Projektstruktur

```
truth-matrix/
├── css/               # Stilmallar
│   ├── main.css       # Gemensamma stilar
│   ├── landing.css    # Stilar för startsidan
│   ├── redpill.css    # Stilar för Red Pill-sidan
│   ├── bluepill.css   # Stilar för Blue Pill-sidan
│   └── about.css      # Stilar för Om oss-sidan
├── js/                # JavaScript-filer
│   ├── main.js        # Gemensamma funktioner
│   ├── countdown.js   # Nedräkningstimer
│   ├── articles.js    # Artikelhantering 
│   ├── comments.js    # Kommentarshantering
│   ├── search.js      # Sökfunktionalitet
│   ├── redpill.js     # Red Pill-specifik funktionalitet
│   └── bluepill.js    # Blue Pill-specifik funktionalitet
├── data/              # JSON-databaser
│   ├── redpill-articles.json   # Artiklar för Red Pill
│   ├── bluepill-articles.json  # Artiklar för Blue Pill
│   ├── redpill-comments.json   # Kommentarer för Red Pill
│   └── bluepill-comments.json  # Kommentarer för Blue Pill
├── images/            # Bilder och grafik
├── index.html         # Startsida med val
├── redpill.html       # Red Pill-sidan
├── bluepill.html      # Blue Pill-sidan
└── about.html         # Om oss-sidan
```

## Installation och användning

1. Klona repositoryt:
   ```
   git clone https://github.com/abdal-rahman543/truth-matrix.git
   ```

2. Öppna `index.html` i din webbläsare.

Alternativt kan du använda en lokal server för att köra projektet:

```
cd truth-matrix
python -m http.server 8000
```

Besök sedan `http://localhost:8000` i din webbläsare.

## Bilder

För att webbplatsen ska visas korrekt behöver du lägga till bilderna som specificeras i `images/README.md`. Du kan använda valfria placeholder-bilder under utveckling.

## Anpassning

Det är enkelt att utöka projektet med fler artiklar genom att lägga till nya objekt i JSON-filerna under `data/`-mappen.

## Utbildningssyfte

Detta projekt är skapat i utbildningssyfte för att:

1. Demonstrera modern webbdesign med ren HTML, CSS och JavaScript
2. Illustrera hur kontrasterande perspektiv kan påverka informationsupplevelse
3. Uppmuntra kritiskt tänkande och medvetenhet om mediekonsumtion
4. Utforska interaktivitetsdesign och användarupplevelse

## Licens

Detta projekt är licensierat under MIT-licensen - se LICENSE-filen för detaljer.

## Friskrivning

Innehållet i Red Pill-sektionen representerar inte skaparnas åsikter och är enbart inkluderat för att illustrera konceptet med kontrasterande informationsperspektiv. Projektet uppmuntrar användare att utvärdera information kritiskt oavsett källa.
