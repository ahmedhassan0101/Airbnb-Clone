"use client";

import type { Profile } from "@/types/profile";
import type { ActionFunction } from "@/types/form";
import FormContainer from "@/src/components/form/FormContainer";
import FormInput from "@/src/components/form/FormInput";
import { SubmitButton } from "@/src/components/form/Buttons";

interface ProfileFormProps {
  profile?: Profile;
  action: ActionFunction;
  type: "create" | "update";
}

export function ProfileForm({ profile, action, type }: ProfileFormProps) {
  const isUpdate = type === "update";

  return (
    <FormContainer action={action} className="space-y-6 p-6 border rounded-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="firstName"
          placeholder="Enter your first name"
          defaultValue={profile?.firstName}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          placeholder="Enter your last name"
          defaultValue={profile?.lastName}
        />
        <FormInput
          label="Username"
          name="username"
          placeholder="Choose a username"
          defaultValue={profile?.username}
        />
      </div>
      <SubmitButton
        text={isUpdate ? "Update Profile" : "Create Profile"}
        className="w-full mt-6"
      />
    </FormContainer>
  );
}
