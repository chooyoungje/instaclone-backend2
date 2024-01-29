// Header를 가지는 단순 컴포넌트
// 로그인 여부에 떄라 헤더를 보여줄지 말지를 결정해줄 수 있다
// 페이지에 따라 헤더에 어떤 걸 보여줄지도 설정해준다
// 이 레이아웃을 통해 헤더와 메인 사이 여백을 추가해주기
import { styled } from "styled-components";
import Header from "./Header";
// 인스타그램 콘텐츠들은 같은 너비에 다 들어가있음, 중앙 정렬
// HeaderLayout 안에 있는 모든 것들은  Header와 content를 가지게 됨
const Content = styled.main`
  margin-top: 45px;
  max-width: 930px; // Wrapper의 최대 사이즈
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
`;

function HeaderLayout({ children }: any) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default HeaderLayout;
