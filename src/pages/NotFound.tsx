import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-slate-500">
      <Frown className="w-16 h-16 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">404 Not Found</h1>
      <p className="text-lg">Sorry, the page you&#39;re looking for does not exist.</p>
    </div>
  );
}