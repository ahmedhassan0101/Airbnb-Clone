"use client"
import { formattedCountries } from "@/src/utils/countries";
import SelectInput from "./SelectInput";

export default function CountriesInput({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const options = formattedCountries.map((country) => ({
    value: country.code,
    label: country.name,
    prefix: country.flag,
  }));

  return (
    <SelectInput
      name="country"
      label="Country"
      options={options}
      defaultValue={defaultValue}
    />
  );
}
