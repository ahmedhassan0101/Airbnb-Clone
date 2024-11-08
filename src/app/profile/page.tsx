import { fetchProfile, updateProfileAction, updateProfileImageAction } from "@/src/utils/actions";
import { ProfileForm } from "./comp/ProfileForm";
import { ImageUploadContainer } from "@/src/components/form/ImageUploadContainer";

export default async function ProfilePage() {
  const profile = await fetchProfile();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>
      <ImageUploadContainer
        image={profile.profileImage}
        action={updateProfileImageAction}
      />
      <ProfileForm
        profile={profile}
        action={updateProfileAction}
        type="update"
      />
    </div>
  );
}