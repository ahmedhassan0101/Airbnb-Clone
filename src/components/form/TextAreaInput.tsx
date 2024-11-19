import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import React, { TextareaHTMLAttributes } from "react";

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
};

const tempDefaultDescription =
  "Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi, and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahowitzka River, and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets, please. Ducks, hens, and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever, and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees blossom and harvest in Fall. Our farm store offers farm-to-table products.";

function TextAreaInput({
  name,
  label = name,
  defaultValue = tempDefaultDescription,
  ...props
}: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        rows={5}
        className="leading-loose"
        {...props}
      />
    </div>
  );
}

export default TextAreaInput;
