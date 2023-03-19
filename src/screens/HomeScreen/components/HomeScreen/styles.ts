import styled from "styled-components";

import { COLOR } from "shared/Color";
import Typography from "shared/components/Typography/Typography";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h2`
  color: ${COLOR.PRIMARY};
  margin-bottom: 30px;
`;

export const EmptyTableTypography = styled(Typography)`
  margin-bottom: 12px;
`;
