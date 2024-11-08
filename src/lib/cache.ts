import { PropertyFilters } from '@/types/profile';
import { unstable_cache } from 'next/cache';
import { fetchProperties } from '../utils/actions';

export const getCachedProperties = unstable_cache(
  
  async (filters: PropertyFilters) => {
    const properties = await fetchProperties(filters);
    return properties;
  },
  ['properties'],
  { revalidate: 60, tags: ['properties'] }
);