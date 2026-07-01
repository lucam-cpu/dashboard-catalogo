import "./globals.css";

export const metadata = {
  title: "Dashboard Catalogo",
  description: "Catalogo articoli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
