export default function LoginPage({ searchParams }) {
  const showError = searchParams?.errore === "1";

  return (
    <div className="login-wrap">
      <form className="login-box" action="/api/login" method="POST">
        <h1>Dashboard Catalogo</h1>
        <p className="subtitle">Inserisci la password per accedere</p>
        {showError && <p className="error">Password errata, riprova.</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
        />
        <button type="submit">Entra</button>
      </form>
    </div>
  );
}
