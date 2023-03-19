import Button from "shared/components/Button/Button";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BackButton = styled(Button)`
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const StyledButton = styled(Button)`
  margin-top: 12px;
`;
