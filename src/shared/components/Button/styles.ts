import { COLOR } from "shared/Color";
import styled from "styled-components";

export const Container = styled.button`
  padding: 12px 14px;
  border-radius: 6px;
  background: ${({ disabled, color }) =>
    disabled ? COLOR.GRAY : color || COLOR.PRIMARY};
  color: ${({ disabled, color }) =>
    disabled ? COLOR.BLACK : COLOR.WHITE || color};
  box-shadow: rgb(0 0 0 / 10%) 1px 2px 4px;
  border: 1px solid
    ${({ disabled, color }) => (disabled ? COLOR.GRAY : color || COLOR.PRIMARY)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  height: 42px;
  text-align: center;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? COLOR.GRAY : COLOR.WHITE};
    color: ${COLOR.BLACK};
    ${({ disabled }) => (disabled ? "pointer-events: none;" : "")}
    border: 1px solid ${({ disabled }) =>
      disabled ? COLOR.GRAY : COLOR.WHITE};
  }
`;

export default Container;
