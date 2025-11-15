import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils";

function highlightWord(text: string, word: string) {
  if (!word || !text) return text;

  const regex = new RegExp(`(${word}s?)`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function WordDefinition() {
  const params = useParams()
  const { isPending, error, data} = useQuery({
    queryKey:['word-definition'],
    queryFn: () => {
      return fetch(`${API_URL}/definition?word=${params.word}`).then(res => res.json())
    }
  })

  console.log('WordDefinition data:', data)
  console.log('WordDefinition error:', error)
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-slate-500">
      {isPending && <p>Loading...</p>}
      {error && (
        <div className="w-full max-w-4xl">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 shadow-sm border border-red-200 dark:border-red-800">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
                {error.message?.includes('404') || error.message?.toLowerCase().includes('not found') ? 'Word Not Found' : 'Error'}
              </h2>
              <p className="text-red-600 dark:text-red-400">
                {error.message?.includes('404') || error.message?.toLowerCase().includes('not found')
                  ? `Sorry, we couldn't find the word "${params.word}" in our dictionary.`
                  : error.message
                }
              </p>
            </div>
          </div>
        </div>
      )}
      {data &&
        <div className="w-full max-w-4xl">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 capitalize">
                {data.word}
              </h2>
              { data.genre && <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                data.genre === 'masculine'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {data.genre === 'masculine' ? 'le' : 'la'}
              </span>}
            </div>

            <div className="space-y-4">
              {data.definitions && data.definitions.length > 0 ? data.definitions.map((def: any, idx: number) => (
                <div key={idx} className="border-l-4 border-blue-400 pl-4 py-2">
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                    {def.definition}
                  </p>

                  {def.examples && def.examples.length > 0 && (
                    <div className="ml-6 space-y-2">
                      <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Examples:
                      </h4>
                      {def.examples.map((example: any, exIdx: number) => (
                        <div key={exIdx} className="bg-slate-50 dark:bg-slate-700 rounded-md p-3 border border-slate-200 dark:border-slate-600">
                          <p className="text-slate-600 dark:text-slate-400 italic">
                            "{highlightWord(example, data.word)}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">
                    No definitions available for the word <span className="font-bold text-slate-700 dark:text-slate-300">{params.word}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
}