import { z } from 'zod';
import { profileSchema } from '@/src/utils/schemas';

export type Profile = z.infer<typeof profileSchema> & {
  id?: string;
  profileImage?: string;
  email?: string;
};

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
  category?: string;
};
export interface PropertyFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}