import { Typography } from "@mui/material";

interface Props {
  subtitle: React.ReactNode;
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  size?: string | number;
  [key: string]: any;
}

const Subtitle: React.FC<Props> = ({ subtitle, weight = '500', size = '24px', ...props }: Props) => {
  return (
    <h2 style={{ fontSize: size, fontWeight: weight, letterSpacing: '0.2px'}} {...props}>
      {subtitle}
    </h2>
  );
};

export default Subtitle;
