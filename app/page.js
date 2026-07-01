import photos from "../data/products.json";

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

export default function Dashboard() {
  return (
    <div className="page">
      <header className="topbar">
        <h1>Catalogo Articoli</h1>
        <form action="/api/logout" method="POST">
          <button type="submit" className="logout-btn">
            Esci
          </button>
        </form>
      </header>

      <p className="count">{photos.length} foto</p>

      <div className="grid">
        {photos.map((p) => (
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
    </div>
  );
}
