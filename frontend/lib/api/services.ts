import { apiRequest } from './client';
import { Service } from '@/types/api';

/**
 * Fetch all published services
 */
export async function getServices(): Promise<Service[]> {
  return apiRequest<Service[]>('/services');
}

/**
 * Fetch a single published service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service> {
  return apiRequest<Service>(`/services/${encodeURIComponent(slug)}`);
}
