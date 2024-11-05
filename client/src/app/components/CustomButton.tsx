import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  icon?: React.ElementType;
  color: string;
  hoverColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  [key: string]: any;
  width?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<Props> = ({
  children,
  icon: Icon,
  color = "#000",
  hoverColor = "#f3f3f3",
  borderColor = "#e4e4e7",
  width = "180px",
  hoverTextColor,
  type,
  ...props
}: Props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        color,
        border: `1px solid ${borderColor}`,
        textTransform: "capitalize",
        width: `${width}`,
        "&:hover": {
          backgroundColor: hoverColor,
          border: `1px solid ${borderColor}`,
          color: hoverTextColor || color,
        },
      }}
      type={type}
      {...props}
    >
      {Icon && <Icon sx={{ fontSize: "16px", marginRight: "5px" }} />}
      {children}
    </Button>
  );
};

export default CustomButton;