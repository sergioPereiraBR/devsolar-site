interface SearchSuggestionProps {
  queries: string[];
}

const GoogleSearchSuggestions = ({ queries }: SearchSuggestionProps) => {
  if (!queries || queries.length === 0) return null;

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <div className="mb-3 flex items-center gap-2">
        {/* Logotipo do Google (Simulado com texto por conformidade) */}
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Pesquisas relacionadas no Google:
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {queries.map((query, index) => (
          <a
            key={index}
            href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:border-blue-400 hover:bg-gray-50"
          >
            <svg
              className="h-3 w-3 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.49 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" />
              <path d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98c-.82 1.64-1.29 3.48-1.29 5.38s.47 3.74 1.29 5.38l3.98-3.09z" />
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.92-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
            {query}
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoogleSearchSuggestions;
