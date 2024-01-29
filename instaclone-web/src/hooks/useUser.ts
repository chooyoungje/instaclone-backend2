import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// 쿼리 만들기
const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  // 사용자가 로그인을 했는지 알아내기, localStorage에 토큰이 있나??
  const hasToken = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  console.log(data);
  useEffect(() => {
    if (data?.me === null) {
      // 로컬스토리지에 토큰이 존재하지만 이 토큰이 백엔드에서 작동하지 않음
      // 이럴 경우 어떤 조치를 해야하나?? => 유저 로그아웃 시키기
      logUserOut(history);
      // 근데 정상적으로 로그인을 해도 로그아웃이 된다??? 왜??
      // 성공적으로 로그인을 했고 옳은 사용자인데 null을 반환
      //
    }
  }, [data]);
  // localStorage를 통해 로그인한 경우에만 쿼리문 실행하기(토큰을 가지고 있는 경우에만)
  // 쿼리를 스킵한다, 어떤 경우에??
  // 사용자가 localStorage의 토큰을 통해 로그인을 하지 않응 경우 토큰을 가지고 있지 않다면 실행 안함
  return { data };
}

export default useUser;
// useUser hook을 만든 이유 . 사용자를 완전히 신뢰하지 못함
// 토큰의 유무뿐만 아니라 정상적인 토큰인지 확인하는 작업이 필요

// useEffect : hook가 생성될 때 한 번 실행, 데이터가 변경될 때마다 실행
