"use client";

import { useMemo, useState } from "react";

function driveImg(fileId, width = 900) {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

const FIELD_LABELS = {
  DESCRIZIONE_ART: "Descrizione",
  TESSUTO: "Tessuto",
  DESCRIZIONE_TESSUTO: "Composizione",
  COLORE: "Colore",
  CLIENTE: "Cliente",
  STAGIONE: "Stagione",
  CATEGORIA: "Categoria",
  FORNITORE: "Fornitore",
  FOB: "FOB",
  NOTE: "Note",
};

const FIELD_KEYS = Object.keys(FIELD_LABELS);

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "it", { numeric: true })
  );
}

export default function CatalogoClient({ photos }) {
  const [articolo, setArticolo] = useState("");
  const [tessuto, setTessuto] = useState("");
  const [stagione, setStagione] = useState("");
  const [fornitore, setFornitore] = useState("");
  const [cliente, setCliente] = useState("");

  const [selezionati, setSelezionati] = useState(() => new Set());
  const [campiVisibili, setCampiVisibili] = useState(() => new Set(FIELD_KEYS));
  const [pannelloExportAperto, setPannelloExportAperto] = useState(false);
  const [immagineIngrandita, setImmagineIngrandita] = useState(null);

  const opzioni = useMemo(
    () => ({
      articolo: uniqueSorted(photos.map((p) => p.codice)),
      tessuto: uniqueSorted(photos.map((p) => p.dati?.TESSUTO)),
      stagione: uniqueSorted(photos.map((p) => p.dati?.STAGIONE)),
      fornitore: uniqueSorted(photos.map((p) => p.dati?.FORNITORE)),
      cliente: uniqueSorted(photos.map((p) => p.dati?.CLIENTE)),
    }),
    [photos]
  );

  const filtrate = useMemo(() => {
    return photos
      .filter((p) => (articolo ? p.codice === articolo : true))
      .filter((p) => (tessuto ? p.dati?.TESSUTO === tessuto : true))
      .filter((p) => (stagione ? p.dati?.STAGIONE === stagione : true))
      .filter((p) => (fornitore ? p.dati?.FORNITORE === fornitore : true))
      .filter((p) => (cliente ? p.dati?.CLIENTE === cliente : true))
      .sort((a, b) => a.codice.localeCompare(b.codice, "it", { numeric: true }));
  }, [photos, articolo, tessuto, stagione, fornitore, cliente]);

  const selezionatiOrdinati = useMemo(
    () =>
      photos
        .filter((p) => selezionati.has(p.fileId))
        .sort((a, b) => a.codice.localeCompare(b.codice, "it", { numeric: true })),
    [photos, selezionati]
  );

  const reset = () => {
    setArticolo("");
    setTessuto("");
    setStagione("");
    setFornitore("");
    setCliente("");
  };

  const filtriAttivi = articolo || tessuto || stagione || fornitore || cliente;

  function toggleSelezione(fileId) {
    setSelezionati((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) {
        next.delete(fileId);
      } else {
        next.add(fileId);
      }
      return next;
    });
  }

  function selezionaTuttiVisibili() {
    setSelezionati((prev) => {
      const next = new Set(prev);
      filtrate.forEach((p) => next.add(p.fileId));
      return next;
    });
  }

  function deselezionaTutti() {
    setSelezionati(new Set());
  }

  function toggleCampo(key) {
    setCampiVisibili((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function stampaOPdf() {
    window.print();
  }

  return (
    <>
      <div className="filters no-print">
        <div className="filter-field">
          <label htmlFor="f-articolo">Articolo</label>
          <select
            id="f-articolo"
            value={articolo}
            onChange={(e) => setArticolo(e.target.value)}
          >
            <option value="">Tutti</option>
            {opzioni.articolo.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="f-tessuto">Tessuto</label>
          <select
            id="f-tessuto"
            value={tessuto}
            onChange={(e) => setTessuto(e.target.value)}
          >
            <option value="">Tutti</option>
            {opzioni.tessuto.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="f-stagione">Stagione</label>
          <select
            id="f-stagione"
            value={stagione}
            onChange={(e) => setStagione(e.target.value)}
          >
            <option value="">Tutte</option>
            {opzioni.stagione.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="f-fornitore">Fornitore</label>
          <select
            id="f-fornitore"
            value={fornitore}
            onChange={(e) => setFornitore(e.target.value)}
          >
            <option value="">Tutti</option>
            {opzioni.fornitore.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="f-cliente">Cliente</label>
          <select
            id="f-cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          >
            <option value="">Tutti</option>
            {opzioni.cliente.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {filtriAttivi ? (
          <button type="button" className="reset-btn" onClick={reset}>
            Azzera filtri
          </button>
        ) : null}
      </div>

      <div className="export-bar no-print">
        <p className="count">
          {filtrate.length} foto &middot; {selezionati.size} selezionati
        </p>
        <div className="export-actions">
          <button type="button" className="link-btn" onClick={selezionaTuttiVisibili}>
            Seleziona tutti i visibili
          </button>
          <button type="button" className="link-btn" onClick={deselezionaTutti}>
            Deseleziona tutti
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setPannelloExportAperto((v) => !v)}
          >
            Campi da includere
          </button>
          <button
            type="button"
            className="print-btn"
            disabled={selezionati.size === 0}
            onClick={stampaOPdf}
          >
            Stampa / Crea PDF ({selezionati.size})
          </button>
        </div>
      </div>

      {pannelloExportAperto && (
        <div className="fields-panel no-print">
          {FIELD_KEYS.map((key) => (
            <label key={key} className="field-check">
              <input
                type="checkbox"
                checked={campiVisibili.has(key)}
                onChange={() => toggleCampo(key)}
              />
              {FIELD_LABELS[key]}
            </label>
          ))}
        </div>
      )}

      <div className="grid no-print">
        {filtrate.map((p) => (
          <article
            className={`card${selezionati.has(p.fileId) ? " card-selected" : ""}`}
            key={p.fileId}
          >
            <label className="select-check">
              <input
                type="checkbox"
                checked={selezionati.has(p.fileId)}
                onChange={() => toggleSelezione(p.fileId)}
              />
              Seleziona
            </label>
            <div className="photos">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={driveImg(p.fileId)}
                alt={p.codice}
                loading="lazy"
                className="photo main"
                onClick={() => setImmagineIngrandita(p)}
              />
            </div>
            <div className="info">
              <h2>{p.codice}</h2>
              {p.dati ? (
                <dl>
                  {Object.entries(FIELD_LABELS).map(([key, label]) =>
                    p.dati[key] ? (
                      <div className="row" key={key}>
                        <dt>{label}</dt>
                        <dd>{p.dati[key]}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              ) : (
                <p className="no-data">Nessun dato in Excel per questo articolo</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Area visibile solo in stampa/PDF, con solo gli articoli selezionati e i campi scelti */}
      <div className="print-area">
        <h1 className="print-title">Catalogo Articoli</h1>
        <div className="print-grid">
          {selezionatiOrdinati.map((p) => (
            <div className="print-card" key={p.fileId}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={driveImg(p.fileId)} alt={p.codice} className="print-photo" />
              <div className="print-info">
                <h2>{p.codice}</h2>
                {p.dati ? (
                  <dl>
                    {FIELD_KEYS.filter((key) => campiVisibili.has(key) && p.dati[key]).map(
                      (key) => (
                        <div className="row" key={key}>
                          <dt>{FIELD_LABELS[key]}</dt>
                          <dd>{p.dati[key]}</dd>
                        </div>
                      )
                    )}
                  </dl>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {immagineIngrandita && (
        <div
          className="lightbox no-print"
          onClick={() => setImmagineIngrandita(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setImmagineIngrandita(null)}
            aria-label="Chiudi"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={driveImg(immagineIngrandita.fileId, 1600)}
            alt={immagineIngrandita.codice}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
