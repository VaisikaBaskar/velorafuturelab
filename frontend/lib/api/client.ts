import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Resolves a full endpoint URL while gracefully handling:
 * - base URLs with or without trailing slash (e.g. 'https://api.domain.com/' vs 'https://api.domain.com')
 * - base URLs with or without '/api' (e.g. 'https://api.domain.com' vs 'https://domain.com/api')
 * - endpoints with or without leading slash (e.g. '/services' vs 'services')
 * - endpoints that already include '/api' (prevents duplicate '/api/api')
 */
export function resolveApiUrl(baseUrl: string, endpoint: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (cleanBase.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    return `${cleanBase}${cleanEndpoint.slice(4)}`;
  }

  if (!cleanBase.endsWith('/api') && !cleanEndpoint.startsWith('/api/')) {
    return `${cleanBase}/api${cleanEndpoint}`;
  }

  return `${cleanBase}${cleanEndpoint}`;
}

/**
 * Centralized API request helper
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = resolveApiUrl(API_BASE_URL, endpoint);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Next.js caching policy: revalidate or no-store based on requirements
    cache: options.cache || 'no-store',
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        result && typeof result === 'object' && 'message' in result
          ? (result as { message: string }).message
          : `Request failed with status ${response.status}`;

      throw new ApiError(errorMessage, response.status, result?.details);
    }

    const payload = result as ApiResponse<T>;
    return payload.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Network communication error';
    throw new ApiError(message, 500);
  }
}
