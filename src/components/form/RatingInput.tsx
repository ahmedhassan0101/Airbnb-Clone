import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RatingInput = ({ name, label }: { name: string; label?: string }) => {

  const ratingOptions = [5, 4, 3, 2, 1].map(String);
  return (
    <div className="mb-2 max-w-xs">
      <Label htmlFor={name} className="capitalize">
        {label || name.charAt(0).toUpperCase() + name.slice(1)}
      </Label>
      <Select defaultValue={ratingOptions[0]} name={name} required>
        <SelectTrigger>
          <SelectValue placeholder="Choose rating" />
        </SelectTrigger>
        <SelectContent>
          {ratingOptions.map((value) => (
            <SelectItem key={value} value={value}>
              {value} {value === '1' ? 'star' : 'stars'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;
