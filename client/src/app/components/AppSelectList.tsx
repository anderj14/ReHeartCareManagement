import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  items: { id: number; [key: string]: any }[];
  label: string;
  displayField: (item: any) => string;
}

export default function AppSelectList({
  control,
  name,
  items,
  label,
  displayField,
}: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            label={label}
            value={field.value ?? ""}
            onChange={(event) => field.onChange(Number(event.target.value))}
            sx={{
              fontSize: '16px',
              height: '50px'
            }}
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {displayField(item)}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
