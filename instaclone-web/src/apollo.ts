import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from "@apollo/client";
import routes from "./routes";

import { setContext } from "@apollo/client/link/context";
const TOKEN = "token";
const DARK_MODE = "DARK_MODE";
// reactive variable 만들기
// makeVar 함수를 사용하면 모든 페이지에서 해당 변수에 접근이 가능해짐
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
// 기본값이 false로 되어있음, 매번 로그아웃 상태로 만들어버림
// localStorage에 있는 토큰에 따라 true false 결정됙[ 하기

export const darkModeVar = makeVar(Boolean(localStorage.getItem("DARK_MODE") === "enabled"));

// 이러한 변수를 react.ts component의 내부에서 사용할려면 hook를 사용해야 한다 => App.ts로

export const enabledDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled"); // 새로고침을 해도 다크모드가 유지되게함
  darkModeVar(true);
};

export const disabledDarkMode = () => {
  localStorage.setItem(DARK_MODE, "disabled");
  darkModeVar(false);
};

// 로그인을 할 떄 토큰을 저장하기
export const logUserIn = (token: any) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

// 로그아웃 할 떄 토큰 없애기
export const logUserOut = (history: any) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  // 회원가입 -> 로그인 -> 홈(로그아웃 실행)
  history?.replace(routes.home, null);
};

// 서버에 요청을 보낼 때 헤더에 토큰을 담아보내기 위해 link 이용하기
// 1. httpLink 만들기
//
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// 2.authLink 만들기 setContext() 사용 : 클라이언트의 모든 요청에 몇 가지 항목을 추가해줌. request의 context를 설정해주는 함수임
// 함수를 인자로 받음.
// 첫번쨰: grephQL request
// 두번쨰 :
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers, // 이전 헤더
      token: localStorage.getItem(TOKEN),
      //내가 찾는 헤더의 이름
    },
  };
});

export const client = new ApolloClient({
  // 두개의 링크를 하나로 묶어주기
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      // 여기에 내가 변경하고자 하는 타입의 이름을 적어주면 됨
      User: {
        keyFields: (obj) => `User:${obj.username}`,
        // 정확히 어떤 필드를 고유식별자로 설정할 것인지 Apollo에게 알려줌
      },
    },
  }),
  connectToDevTools: true,
});
// uri : GraphQL 의 URL을 넣어주면됨
// cache : Apollo가 한번 가져온 정보를 기억하기 위한 저장소, 똑같은 정보를 가져오는 것을 방지
