'use client';

import { useState, useEffect } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

export default function GitHubPortfolio() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USERNAME = 'arman-101';

  // Data fetching using useEffect
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories for user: ${GITHUB_USERNAME}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch {
        setError("We couldn't load the repositories at this time. Please check your connection and try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [GITHUB_USERNAME]);

  // Real-time filtering logic
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 border-b border-border-primary pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          {GITHUB_USERNAME}&apos;s Repositories
        </h1>
        <p className="text-text-muted text-lg">Part 2</p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search repositories by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isLoading || error !== null}
          className="w-full md:w-1/2 p-3 bg-bg-card text-text-primary border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 shadow-sm"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-primary">
          <svg className="animate-spin h-10 w-10 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-lg font-semibold">Loading repositories...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State ) */}
      {!isLoading && !error && filteredRepos.length === 0 && (
        <div className="text-center py-20 bg-bg-card border border-border-primary rounded-lg shadow-sm">
          <p className="text-text-muted text-lg">
            No repositories found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}

      {/* Grid Layout */}
      {!isLoading && !error && filteredRepos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRepos.map((repo) => (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              className="group bg-bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden border border-border-primary p-6 flex flex-col h-full"
            >
              <div className="grow">
                <h2 className="text-xl font-bold text-text-primary group-hover:text-accent-pink transition-colors wrap-break-word">
                  {repo.name}
                </h2>
                
                {/* Handling of null descriptions */}
                <p className="text-sm text-text-muted mt-3 line-clamp-3">
                  {repo.description ? repo.description : <span className="italic">No description provided.</span>}
                </p>
              </div>

              {/* Card Footer for Language and Stars */}
              <div className="mt-6 flex items-center justify-between border-t border-border-primary pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-light inline-block"></span>
                  <span className="text-xs font-semibold text-text-secondary">
                    {repo.language || 'Unspecified'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-text-secondary">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-xs font-bold">{repo.stargazers_count.toLocaleString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}