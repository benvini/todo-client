import { Container } from "./styles";
import { TypographyProps } from "./types";

const Typography = (props: TypographyProps) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Typography;
