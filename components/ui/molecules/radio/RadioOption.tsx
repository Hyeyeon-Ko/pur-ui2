import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";

interface RadioOptionProps {
  id: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  value,
  checked,
  onChange,
  label,
}) => (
  <Label htmlFor={id} customStyle={{ display: "flex", alignItems: "center" }}>
    <Input
      id={id}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <span className="ml-2">{label}</span>
  </Label>
);

export default RadioOption;
