import { useReactiveVar } from "@apollo/client";
import { styled } from "styled-components";
import { darkModeVar, disabledDarkMode, enabledDarkMode } from "../../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

type Props = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper: any = styled.div`
  max-width: 350px;
  width: 100%;
`;

// 다크모드 만들기
const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.button`
  cursor: pointer; // 이걸 넣어주면 클릭이 가능해짐
`;
// 다크 모드를 적용할려면 다크모드의 데이터를 어디선가 가져와야함
// apollo.ts에서 darkModeVar 가져오기

function AuthLayout({ children }: Props) {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disabledDarkMode : enabledDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
