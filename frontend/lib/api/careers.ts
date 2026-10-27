import { apiRequest } from './client';
import { Career, JobApplication, JobApplicationInput } from '@/types/api';

/**
 * Fetch all active career openings
 */
export async function getCareers(): Promise<Career[]> {
  return apiRequest<Career[]>('/careers');
}

/**
 * Fetch a single career opening by slug
 */
export async function getCareerBySlug(slug: string): Promise<Career> {
  return apiRequest<Career>(`/careers/${encodeURIComponent(slug)}`);
}

/**
 * Submit job application for a career vacancy
 */
export async function applyForCareer(
  careerId: string,
  data: JobApplicationInput
): Promise<JobApplication> {
  return apiRequest<JobApplication>(`/careers/${encodeURIComponent(careerId)}/apply`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
