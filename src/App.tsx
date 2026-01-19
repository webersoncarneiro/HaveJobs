import { useState, useEffect } from 'react';
import { JobService } from './services/jobService';
import type { Job } from './services/jobService';
import { Header } from './components/Layout/Header';
import { JobList } from './components/Jobs/JobList';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      const loadedJobs = await JobService.getJobs();
      setJobs(loadedJobs);
    };
    loadJobs();
  }, []);

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
        </div>
      </main>
    </div>
  );
}

export default App;
