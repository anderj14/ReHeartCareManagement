import { FormControl } from "@mui/material";

interface Props {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  sx?: object;
  height?: string;
  minWidth: string;
}

const CustomSelect: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  sx = {},
  height = "36px",
  minWidth = '200px'
}) => {
  return (
    <FormControl>
        
    </FormControl>
  )
};

export default CustomSelect;
