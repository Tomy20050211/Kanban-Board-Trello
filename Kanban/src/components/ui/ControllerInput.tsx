import type { ControllerInputProps } from "../../types/input.interface"


export function ControllerInput({value,placeholder, onChange }: ControllerInputProps) {

  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        
      />

    </div>
  );
}