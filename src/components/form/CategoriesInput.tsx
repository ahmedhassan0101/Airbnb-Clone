import { categories } from "@/src/utils/categories";
import SelectInput from "./SelectInput";

function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  const options = categories.map((category) => ({
    value: category.label,
    label: category.label,
    icon: category.icon,
  }));

  return (
    <SelectInput
      name="category"
      label="Categories"
      options={options}
      defaultValue={defaultValue}
    />
  );
}

export default CategoriesInput;
