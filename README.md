# Dashboard Catalogo Articoli

Dashboard protetta da password che mostra le foto prodotto e i dati dal file
Excel presenti nella cartella Google Drive del catalogo. Le foto vengono
caricate direttamente da Google Drive (nessuna copia locale), i dati Excel
sono salvati in `data/products.json`.

## Come funziona

- `data/products.json` contiene, per ogni articolo: il codice, l'elenco delle
  foto (ID del file su Drive) e i dati abbinati dal file Excel.
- La pagina principale (`app/page.js`) legge questo file e mostra le card,
  ordinate per codice articolo crescente.
- L'accesso è protetto da una password unica (`middleware.js` + pagina
  `/login`), impostata tramite la variabile d'ambiente `DASHBOARD_PASSWORD`.

## Pubblicazione su GitHub + Vercel

1. Crea un nuovo repository vuoto su GitHub (es. `dashboard-catalogo`).
2. Nella cartella di questo progetto:
   ```
   git init
   git add .
   git commit -m "Prima versione dashboard"
   git branch -M main
   git remote add origin https://github.com/TUO-USER/dashboard-catalogo.git
   git push -u origin main
   ```
3. Vai su [vercel.com](https://vercel.com), accedi con GitHub e clicca
   "Add New Project", seleziona il repository appena creato.
4. Prima di fare deploy, apri "Environment Variables" e aggiungi:
   - Nome: `DASHBOARD_PASSWORD`
   - Valore: `vision2026` (o la password che preferisci)
5. Clicca "Deploy". Dopo qualche minuto la dashboard sarà online con un
   indirizzo tipo `https://dashboard-catalogo.vercel.app`.
6. (Opzionale) Collega un tuo dominio personalizzato dalle impostazioni del
   progetto su Vercel.

## Come cambiare la password in futuro

Vai su Vercel → progetto → Settings → Environment Variables, modifica
`DASHBOARD_PASSWORD` e fai un redeploy (Vercel te lo propone automaticamente).

## Come aggiornare i dati (nuove foto o modifiche all'Excel)

I dati non si aggiornano da soli: la cartella Drive può cambiare in ogni
momento, quindi è necessario rigenerare `data/products.json` quando ci sono
novità. Il modo più semplice:

1. Torna in questa conversazione con Claude e scrivi qualcosa come
   "aggiorna la dashboard con i nuovi dati della cartella Drive".
2. Claude rileggerà la cartella Google Drive, rigenererà
   `data/products.json` e ti darà il file aggiornato (o farà lui il commit
   se ha accesso al repository).
3. Basta sostituire il file nel repository GitHub (anche via interfaccia
   web, trascinando il file nella cartella `data/`) e Vercel pubblicherà
   automaticamente la nuova versione in 1-2 minuti.

Non serve nessuna competenza tecnica: non è necessario installare nulla sul
proprio computer per aggiornare i dati.

## Sviluppo locale (facoltativo)

Se vuoi provare la dashboard sul tuo computer prima di pubblicarla:

```
npm install
npm run dev
```

Poi apri http://localhost:3000 (password: quella in `.env.local`).
