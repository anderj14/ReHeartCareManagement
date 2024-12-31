import { Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  icon?: React.ElementType;
  color: string;
  hoverColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  bg?: string;
  [key: string]: any;
  width?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const CustomButton: React.FC<Props> = ({
  children,
  icon: Icon,
  color = "#000",
  hoverColor = "#5c708d",
  bg = "#4d7997",
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
        cursor: "pointer",
        border: `1px solid ${borderColor}`,
        textTransform: "capitalize",
        width: `${width}`,
        backgroundColor: `${bg}`,
        display: 'flex',
        gap: '8px',
        "&:hover": {
          backgroundColor: hoverColor,
          border: `1px solid ${borderColor}`,
          color: hoverTextColor || color,
        },
      }}
      type={type}
      {...props}
    >
      {Icon && <Icon size={20} sx={{ marginRight: "50px" }} />}
      {children}
    </Button>
  );
};

export default CustomButton;
