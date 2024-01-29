import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 재사용하기 편하게 가장 많이 사용하는 색깔들을 theme에 넣기
//
export const lightTheme: DefaultTheme = {
  accent: "#4cb5f9",
  borderColor: "rgb(219, 219, 219)",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
};

export const darkTheme = {
  accent: "#4cb5f9",
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

// Global Styles(전역 스타일), styled 컴포넌트, 페이지 전체에 적용
// 여기에 쓰는 것이 전체 body에 적용됨
// 모든 body에 입히고 싶다면 body{}를 먼저 쓰고 스타일 쓰기
// 모든 form에 입히고 싶다면 form{}를 먼저 쓰고 스타알 쓰기
export const GlobalStyles = createGlobalStyle`
    ${reset}
    input{
      all:unset
    }
    *{
      box-sizing: border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor}; 
        // 직접쓰는게 아니라 props를 이용하여 변경가능하게하기
        font-size:14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor}
    }
    a{
      text-decoration: none;
      color: inherit;
    }
`;
