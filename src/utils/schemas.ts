import * as z from "zod";
import { ZodSchema } from "zod";
import { formattedCountries } from "./countries";
import { CATEGORY_LABELS } from "./categories";

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "first name must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "last name must be at least 2 characters",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters",
  }),
});
export const imageSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a valid file",
    })
    .refine((file) => file && file.size > 0, "Please select a file")
    .refine(
      (file) => file && file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported"
    ),
});
// export const imageSchema = z.object({
//   image: validateFile(),
// });

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFilesTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1 MB")
    .refine((file) => {
      return (
        !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}

export const propertySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  tagline: z
    .string()
    .min(2, "Tagline must be at least 10 characters")
    .transform((val) => val.trim()),
  category: z.enum(CATEGORY_LABELS),
  country: z
    .string()
    .refine(
      (val) => formattedCountries.some((country) => country.code === val),
      { message: "Please select a valid country" }
    ),
  description: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => {
        const words = val.split(/\s+/).filter(Boolean);
        return words.length >= 10 && words.length <= 1000;
      },
      { message: "Description must be between 10 and 1000 words" }
    ),
  price: z.coerce.number().positive("Price must be positive"),
  guests: z.coerce.number().positive("Must have at least 1 guest"),
  bedrooms: z.coerce.number().positive("Must have at least 1 bedroom"),
  beds: z.coerce.number().positive("Must have at least 1 bed"),
  baths: z.coerce.number().positive("Must have at least 1 bathroom"),
  amenities: z.string(),
  // amenities: z.array(z.string()).min(1, "Select at least one amenity"),
});

export const createReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000),
});
