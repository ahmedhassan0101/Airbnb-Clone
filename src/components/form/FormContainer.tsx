"use client";

import { useFormState } from "react-dom";
import React, { useEffect } from "react";
import { useToast } from "@/src/components/ui/use-toast";
import {
  FormState,
  ActionFunction,
  FormInputProps,
  ImageInputProps,
} from "@/types/form";
import FormInput from "./FormInput";
import { ImageInput } from "./ImageInput";

const initialState: FormState = {
  message: "",
  errors: {},
};
type FormContainerProps = {
  action: ActionFunction;
  children: React.ReactNode;
  className?: string;
};

export default function FormContainer({
  action,
  children,
  className = "",
}: FormContainerProps) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
        variant: state.errors ? "destructive" : "default",
      });
    }
  }, [state, toast]);

  // const childrenWithErrors = React.Children.map(children, (child) => {
  //   if (!React.isValidElement(child)) return child;

  //   // Type guard for FormInput
  //   if (child.type === FormInput) {
  //     return React.cloneElement<FormInputProps>(child, {
  //       ...child.props,
  //       error: state.errors?.[child.props.name as string]?.[0],
  //     });
  //   }

  //   // Type guard for ImageInput
  //   if (child.type === ImageInput) {
  //     return React.cloneElement<ImageInputProps>(child, {
  //       ...child.props,
  //       error: state.errors?.[child.props.name as string]?.[0],
  //     });
  //   }

  //   return child;
  // });

  return (
    <form action={formAction} className={className}>
      {children}
      {/* {childrenWithErrors} */}
    </form>
  );
}


