import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IconType } from "react-icons";

type SelectOption = {
  value: string;
  label: string;
  icon?: IconType;
  prefix?: any;
};
interface SelectInputProps {
  name: string;
  label?: string;
  options: SelectOption[];
  defaultValue?: string;
  className?: string;
}

function SelectInput({
  label,
  name,
  options,
  defaultValue,
  className = "",
}: SelectInputProps) {
  const defaultOption = options.length > 0 ? options[0].value : "";
  return (
    <div className="mb-2">
      {label && (
        <Label htmlFor={name} className="capitalize">
          {label}
        </Label>
      )}
      <Select defaultValue={defaultValue || defaultOption} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                {option.icon && <option.icon className="h-4 w-4" />}
                {option.prefix}
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectInput;
