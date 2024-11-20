import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CustomSelect({ items, checked = [], onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>(checked || []);

  const handleSelectChange = (event: any) => {
      const value = event.target.value as string[];
      setCheckedItems(value);
      onChange(value);
  };

  return (
      <FormControl fullWidth>
          <InputLabel>Brands</InputLabel>
          <Select
                multiple
                value={checkedItems}
                onChange={handleSelectChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {items.map((item) => (
                    <MenuItem key={item} value={item}>
                        <Checkbox checked={checkedItems.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Select>
      </FormControl>
  );
}

// export default CustomSelect;
