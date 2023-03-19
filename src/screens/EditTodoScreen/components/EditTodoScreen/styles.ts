import { COLOR } from "shared/Color";
import styled from "styled-components";
import Typography from "shared/components/Typography/Typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const CreatedAtTypography = styled(Typography)`
  margin-bottom: 2px;
  color: ${COLOR.ERROR};
`;
