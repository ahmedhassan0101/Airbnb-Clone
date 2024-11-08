// export const uploadImage = async (image: File) => {
//   const timestamp = Date.now();
//   const newName = `${timestamp}-${image.name}`;
//   const { data } = await supabase.storage
//     .from(bucket)
//     .upload(newName, image, { cacheControl: '3600' });
//   if (!da    ta) throw new Error('Image upload failed');
//   return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
// };
import { supabase } from "../lib/supabase";

export type ImageUploadResponse = {
  url: string;
  path: string;
};
// const bucket = "airbnb-clone";
export async function uploadImage(
  file: File,
  options: {
    bucket?: string;
    path?: string;
  } = {}
): Promise<ImageUploadResponse> {
  const { bucket = "airbnb-clone", path = "avatars" } = options;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { cacheControl: "3600" });

  if (uploadError) {
    throw new Error("Failed to upload image");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath,
  };
}
