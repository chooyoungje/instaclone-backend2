import { styled } from "styled-components";

const NotificationStyle = styled.span`
  color: #2ecc71;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function Notification({ message }: any) {
  return message === "" || !message ? null : <NotificationStyle>{message}</NotificationStyle>;
}
// 아무것도 없는데 스타일에서 margin을 쓰는바람에 큰 공백이 생긴다
// 그걸 방지ㅎ하기 위해 함수 return에 조건문을 써주자, 이렇게 하면 에러가 생길 때에만 공간이 생기게 됨

export default Notification;
