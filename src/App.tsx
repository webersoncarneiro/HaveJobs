import { useState, useEffect } from 'react';
import { JobService } from './services/jobService';
import type { Job } from './services/jobService';
import { Header } from './components/Layout/Header';
import { JobList } from './components/Jobs/JobList';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const loadJobs = async () => {
      const loadedJobs = await JobService.getJobs();
      setAllJobs(loadedJobs);
      setJobs(loadedJobs.slice(0, ITEMS_PER_PAGE));
    };
    loadJobs();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const nextJobs = allJobs.slice(0, nextPage * ITEMS_PER_PAGE);
    setJobs(nextJobs);
    setPage(nextPage);
  };

  return (
    <div className="app-main">
      <Header />

      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ padding: '2rem 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Latest Opportunities
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Find your next dream role in technology.
          </p>

          <JobList
            jobs={jobs}
          />

          {jobs.length < allJobs.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                onClick={handleLoadMore}
                className="load-more-btn"
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
