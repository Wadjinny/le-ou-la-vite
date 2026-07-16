import { Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center"
          style={{
            background: "var(--indigo-soft)",
            borderRadius: "var(--r-ctrl)",
            color: "var(--indigo)",
          }}
        >
          <Frown className="h-7 w-7" />
        </div>
        <h1
          className="mb-2 text-2xl font-bold tracking-tight"
          style={{ color: "var(--g900)" }}
        >
          Page introuvable
        </h1>
        <p className="mb-6 text-[13px]" style={{ color: "var(--g500)" }}>
          Cette page n&apos;existe pas. Revenez à la recherche.
        </p>
        <Link to="/" className="sr-btn primary">
          Retour à l&apos;accueil
        </Link>
      </main>
    </>
  );
}
