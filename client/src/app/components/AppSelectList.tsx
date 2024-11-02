import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  items: { id: number, patientStatusName: string }[];
  label: string;
}

export default function AppSelectList({ control, name, items, label }: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            label={label}
            value={field.value ?? ""} // Usar un valor por defecto si field.value es undefined
            onChange={(event) => field.onChange(Number(event.target.value))} 
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.patientStatusName}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}


// import {
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { Control, Controller, useController } from "react-hook-form";
// import { PatientStatus } from "../Models/patientStatus";

// interface Props {
//   control: Control<any>;
//   name: string;
//   items: PatientStatus[];
//   label: string;
// }

// export default function AppSelectList(props: Props) {
//   const { fieldState, field } = useController({ ...props, defaultValue: "" });
//   return (
//     <FormControl fullWidth>
//       <InputLabel>{props.label}</InputLabel>
//       <Select
//         label={props.label}
//         value={field.value}
//         // onChange={(event) => field.onChange(Number(event.target.value))}
//         onChange={field.onChange}
//       >
//         {props.items.map((item) => (
//           <MenuItem key={item.id} value={item.id}>
//             {item.patientStatusName}
//           </MenuItem>
//         ))}
//       </Select>
//       <FormHelperText>{fieldState.error?.message}</FormHelperText>
//     </FormControl>
//   );
// }
