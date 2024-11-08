'use client';

import { useRef, useState } from 'react';
import { Label } from '@/src/components/ui/label';
import { Button } from '@/src/components/ui/button';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { ImageInputProps } from '@/types/form';
import { Input } from '../ui/input';

// interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
//   preview?: string;
//   onClear?: () => void;
// }

export function ImageInput({
  label,
  name,
  error,
  preview,
  onClear,
  onChange,
  className,
  ...props
}: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(preview);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onChange?.(e);
    }
  };

  const handleClear = () => {
    setPreviewUrl(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onClear?.();
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      
      <div className="relative w-40 h-40 mx-auto">
        {previewUrl ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full h-full"
            onClick={() => inputRef.current?.click()}
          >
            <Camera className="h-8 w-8" />
          </Button>
        )}
      </div>

      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}


// import { Input } from '../ui/input';
// import { Label } from '../ui/label';

// function ImageInput() {
//   const name = 'image';
//   return (
//     <div className='mb-2'>
//       <Label htmlFor={name} className='capitalize'>
//         Image
//       </Label>
//       <Input
//         id={name}
//         name={name}
//         type='file'
//         required
//         accept='image/*'
//         className='max-w-xs'
//       />
//     </div>
//   );
// }
// export default ImageInput;
