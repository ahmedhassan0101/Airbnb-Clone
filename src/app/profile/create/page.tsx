import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { ProfileForm } from '../comp/ProfileForm';
import { createProfileAction } from '@/src/utils/actions';

export default async function CreateProfilePage() {
  const { userId } = auth();
  if (userId) redirect('/');

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Create Profile</h1>
      <ProfileForm 
        action={createProfileAction}
        type="create"
      />
    </>
  );
}