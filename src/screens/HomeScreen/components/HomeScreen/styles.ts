import styled from "styled-components";

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

export const EmptyTableTypography = styled(Typography)`
  margin-bottom: 12px;
`;
