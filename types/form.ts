import { z } from 'zod';
// import { profileSchema } from '@/utils/schemas';

export type FormState = {
  message: string;
  errors?: Record<string, string[]>;
};

export type ActionFunction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState>;


export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string[];
  className?: string;
}

export interface ImageInputProps extends Omit<FormInputProps, 'type'> {
  preview?: string;
  onClear?: () => void;
}

export type FormChildComponent = 
  | React.ComponentType<FormInputProps>
  | React.ComponentType<ImageInputProps>;

// export type ProfileFormData = z.infer<typeof profileSchema>;