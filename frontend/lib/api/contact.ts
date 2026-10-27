import { apiRequest } from './client';
import { ContactInput, ContactSubmission } from '@/types/api';

/**
 * Submit contact inquiry
 */
export async function submitContact(
  data: ContactInput
): Promise<ContactSubmission> {
  return apiRequest<ContactSubmission>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
