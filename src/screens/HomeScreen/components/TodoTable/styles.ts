import { COLOR } from "shared/Color";
import styled from "styled-components";
import { TableCellProps, TableRowProps } from "./types";

export const TableContainer = styled.div`
  width: 60%;
  margin-bottom: 22px;
  margin-top: 12px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const Thead = styled.thead`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const TableRowCells = styled.tr<TableRowProps>`
  background-color: ${(props) => (props.focused ? COLOR.BLUE : "none")};
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  &:hover {
    background-color: ${COLOR.BLUE};
  }
`;

export const TableRowColumns = styled.tr<TableRowProps>`
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const Tbody = styled.tbody``;

export const TableCell = styled.td<TableCellProps>`
  padding: 12px 16px;
  color: ${(props) => props.color};
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;
