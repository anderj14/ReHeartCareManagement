import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller } from "react-hook-form";
import dayjs from "dayjs";
import React from "react";

interface Props {
  control: Control;
  name: string;
  label: string;
}

export default function DatePickerInput({ control, name, label }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <DateTimePicker
            {...field}
            label={label}
            ampm={false}
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue) => {
              const formattedDate = newValue ? newValue.format("YYYY-MM-DDTHH:mm") : null;
              field.onChange(formattedDate);
            }}
            slotProps={{
                textField: {
                    size: 'small'
                }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
