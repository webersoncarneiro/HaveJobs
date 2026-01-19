import React from 'react';
import type { Job } from '../../services/jobService';
import '../../styles/job-card.css';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="job-card">
            <div className="job-card-header">
                <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                </div>
                <div className="job-type-badge">{job.type}</div>
            </div>

            <div className="job-details">
                <p className="job-location">📍 {job.location}</p>
                <p className="job-salary">💰 {job.salary || 'Competitive'}</p>
            </div>

            <div className="job-tags">
                {job.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            {job.url && (
                <div className="job-footer">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-apply"
                    >
                        Apply Now ↗
                    </a>
                </div>
            )}


        </div>
    );
};
