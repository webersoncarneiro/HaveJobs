import React from 'react';
import type { Job } from '../../services/jobService';
import { JobCard } from './JobCard';
import '../../styles/job-list.css';

interface JobListProps {
    jobs: Job[];
}

export const JobList: React.FC<JobListProps> = ({ jobs }) => {
    if (jobs.length === 0) {
        return (
            <div className="empty-state">
                <p>No jobs found. Be the first to post one! 🚀</p>
            </div>
        );
    }

    return (
        <div className="job-list-grid">
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    job={job}
                />
            ))}
        </div>
    );
};
