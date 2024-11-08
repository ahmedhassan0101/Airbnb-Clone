"use client";

import FormContainer from "./FormContainer";
import { ImageInput } from "./ImageInput";
import { SubmitButton } from "./Buttons";
import type { ActionFunction } from "@/types/form";

interface ImageUploadContainerProps {
  image?: string;
  action: ActionFunction;
  title?: string;
}
export function ImageUploadContainer({
  image,
  action,
  title = "Update Profile Picture",
}: ImageUploadContainerProps) {
  return (
    <FormContainer action={action} className="space-y-4 p-6 border rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ImageInput
        name="image"
        preview={image}
        label="Profile Picture"
        required
      />
      <SubmitButton text="Upload Image" className="w-full" />
    </FormContainer>
  );
}
