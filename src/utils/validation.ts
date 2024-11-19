import { z, ZodSchema } from 'zod';
import { toast } from '@/src/components/ui/use-toast';


export function validateBody<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
}

export class ValidationError extends Error {
  constructor(public errors: Record<string, string[]>) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}

export function validateData<T>(
  schema: z.Schema<T>,
  data: unknown,
  options: {
    errorMap?: z.ZodErrorMap;
    showToast?: boolean;
  } = {}
): T {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.reduce((acc, err) => {
      const path = err.path.join('.') || 'form';
      if (!acc[path]) acc[path] = [];
      acc[path].push(err.message);
      return acc;
    }, {} as Record<string, string[]>);

    if (options.showToast) {
      toast({
        title: 'Validation Error',
        description: Object.values(errors).flat()[0],
        variant: 'destructive',
      });
    }

    throw new ValidationError(errors);
  }

  return result.data;
}
