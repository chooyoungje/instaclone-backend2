import { styled } from "styled-components";

// 많이 쓰이는 컴포넌트를
// 공유 컴포넌트로 만들기
export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.div`
  font-weight: 600;
  color: #737373;
`;

export const FatText = styled.span`
  font-weight: 600;
`;
