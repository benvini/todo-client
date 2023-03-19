import { COLOR } from "shared/Color";
import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  line-height: 1.5;
  color: ${COLOR.BLACK};
  font-weight: 400;
`;
