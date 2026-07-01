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

  const reset = () => {
    setArticolo("");
    setTessuto("");
    setStagione("");
    setFornitore("");
    setCliente("");
  };

  const filtriAttivi = articolo || tessuto || stagione || fornitore || cliente;

  return (
    <>
      <div className="filters">
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

      <p className="count">{filtrate.length} foto</p>

      <div className="grid">
        {filtrate.map((p) => (
          <article className="card" key={p.fileId}>
            <div className="photos">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={driveImg(p.fileId)}
                alt={p.codice}
                loading="lazy"
                className="photo main"
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
    </>
  );
}
