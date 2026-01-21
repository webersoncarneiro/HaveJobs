import React, { useState, useEffect } from 'react';
import type { Job } from '../../services/jobService';
import '../../styles/job-form.css';

interface JobFormProps {
    initialData?: Job | null;
    onSubmit: (jobData: Omit<Job, 'id' | 'postedAt'>) => void;
    onCancel: () => void;
}

interface JobFormData {
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    description: string;
    salary: string;
    tags: string;
}

const emptyJob: JobFormData = {
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    salary: '',
    tags: '',
};

export const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<JobFormData>(emptyJob);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...emptyJob,
                ...initialData,
                salary: initialData.salary || '',
                tags: initialData.tags.join(', ')
            });
        } else {
            setFormData(emptyJob);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                />
            </div>

            <div className="form-group">
                <label>Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="e.g. TechFlow"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Remote"
                    />
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Salary (Optional)</label>
                <input
                    type="text"
                    name="salary"
                    value={formData.salary || ''}
                    onChange={handleChange}
                    placeholder="e.g. $120k - $160k"
                />
            </div>

            <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. React, TypeScript, Node.js"
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn-save">
                    {initialData ? 'Update Job' : 'Post Job'}
                </button>
            </div>
        </form>
    );
};
