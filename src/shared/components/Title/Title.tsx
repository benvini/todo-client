import { Container } from "./styles";
import { TitleProps } from "./types";

const Title = (props: TitleProps) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Title;
