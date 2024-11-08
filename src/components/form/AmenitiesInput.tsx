"use client";
import { amenities, Amenity } from "@/src/utils/amenities";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface AmenitiesInputProps {
  defaultValue?: Amenity[];
}

function AmenitiesInput({ defaultValue = amenities }: AmenitiesInputProps) {
  const [selectedAmenities, setSelectedAmenities] =
    useState<Amenity[]>(defaultValue);

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.map((amenity) =>
        amenity.name === name
          ? { ...amenity, selected: !amenity.selected }
          : amenity
      )
    );
  };

  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(selectedAmenities)}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map(({ name, icon: Icon, selected }) => (
          <div key={name} className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={selected}
              onCheckedChange={() => toggleAmenity(name)}
              aria-label={`Select ${name}`}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
            >
              {name}
              <Icon className="w-4 h-4" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;
