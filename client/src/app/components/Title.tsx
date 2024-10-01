import { Typography } from "@mui/material";

interface Props {
  title: React.ReactNode;
  [key: string]: any;
}

const Title: React.FC<Props> = ({title, ...props}: Props) => {
  return <Typography sx={{fontSize: '22px'}} {...props}>{title}</Typography>;
};

export default Title;
