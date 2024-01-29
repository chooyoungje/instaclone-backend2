import { styled } from "styled-components";
import { BaseBox } from "../shared";

const TopBoxStyle = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 20px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

function TopBox({ children }: any) {
  return <TopBoxStyle>{children}</TopBoxStyle>;
}

export default TopBox;

// children 이란 TopBox 안에 감싸진 것들을 뜻함
