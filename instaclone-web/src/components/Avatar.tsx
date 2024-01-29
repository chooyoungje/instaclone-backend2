import { styled } from "styled-components";

//타입스크립트에서는 props를 styled-components에 넘겨줄 때 타입 지정해주기
const SAvatar = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;
// 이미지 크기 조정
const Img = styled.img`
  max-width: 100%;
`;
// url이 비어있으면 빈 거 보여주기
// lg : 이거에 따라 너비와 높이가 달라짐
function Avatar({ url, lg = false }: any) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
