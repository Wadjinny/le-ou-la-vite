import { Routes, Route } from "react-router-dom";
import SearchWords from "./pages/SearchWord";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/theme";
import { useFrenchDict } from "./hooks/FrenchDict";

export default function App() {
  const frenchDict = useFrenchDict();

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: "var(--bg)" }}>
        <Routes>
          <Route path="/" element={<SearchWords frenchDict={frenchDict} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
