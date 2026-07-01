import photos from "../data/products.json";
import CatalogoClient from "./CatalogoClient";

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

      <CatalogoClient photos={photos} />
    </div>
  );
}
