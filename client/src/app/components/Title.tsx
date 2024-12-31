import { Typography } from "@mui/material";

interface Props {
  title: React.ReactNode;
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  [key: string]: any;
}

const Title: React.FC<Props> = ({ title, weight = '500', ...props }: Props) => {
  return (
    <Typography sx={{ fontSize: "30px", fontWeight: weight}} {...props}>
      {title}
    </Typography>
  );
};

export default Title;
