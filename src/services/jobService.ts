import axios from 'axios';

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
    description: string;
    salary?: string;
    tags: string[];
    postedAt: string;
    companyLogo?: string;
    url?: string;
}

interface RemotiveJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    company_logo: string;
    category: string;
    job_type: string;
    publication_date: string;
    candidate_required_location: string;
    salary: string;
    description: string;
    tags: string[];
}

interface RemotiveResponse {
    'job-count': number;
    jobs: RemotiveJob[];
}

export const JobService = {
    getJobs: async (): Promise<Job[]> => {
        try {
            const response = await axios.get('https://remotive.com/api/remote-jobs?category=software-dev');
            const data = response.data as RemotiveResponse;

            const remotiveJobs = data.jobs || [];

            const mappedJobs: Job[] = remotiveJobs.map(j => ({
                id: j.id.toString(),
                title: j.title,
                company: j.company_name,
                location: j.candidate_required_location,
                type: j.job_type === 'full_time' ? 'Full-time' :
                    j.job_type === 'contract' ? 'Contract' : 'Remote',
                description: j.description,
                salary: j.salary || 'Competitive',
                tags: j.tags || [],
                postedAt: j.publication_date,
                companyLogo: j.company_logo,
                url: j.url
            }));

            return mappedJobs;
        } catch (error) {
            console.error('Failed to fetch jobs from Remotive API', error);
            return [];
        }
    }
};
