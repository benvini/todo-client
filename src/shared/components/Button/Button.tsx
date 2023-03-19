import Container from "./styles";
import { ButtonProps } from "./types";

const Button = (props: ButtonProps) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Button;
