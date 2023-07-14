import Nav from "@components/Nav";
import AuthProvider from "@context/AuthProvider";
import "@styles/globals.css";

export const metadata = {
  title: "Promtopia",
  description: "Discover $ Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
