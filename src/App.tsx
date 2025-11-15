import { Routes, Route } from "react-router-dom";
import SearchWords from "./pages/SearchWord";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/theme";
import { useFrenchDict } from "./hooks/FrenchDict";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import WordDefinition from "./pages/WordDefinition";
const queryClient = new QueryClient()

export default function App() {
  const frenchDict = useFrenchDict();

  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<SearchWords frenchDict={frenchDict} />} />
                <Route path="/word-definition/:word" element={<WordDefinition />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
          </QueryClientProvider>
        </div>
      </ThemeProvider>
    </>
  );
}