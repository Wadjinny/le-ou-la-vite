import { Routes, Route } from "react-router-dom";
import SearchWords from "./pages/SearchWord";
import NotFound from "./pages/NotFound";
export default function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<SearchWords />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }