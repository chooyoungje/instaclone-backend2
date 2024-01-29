import { styled } from "styled-components";

const SeparatorStyle = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.fontColor};
  }
  span {
    margin: 0px 10px;
    color: ${(props) => props.theme.fontColor};
    font-weight: 600;
  }
`;

function Separator() {
  return (
    <SeparatorStyle>
      <div></div>
      <span>Or</span>
      <div></div>
    </SeparatorStyle>
  );
}

export default Separator;
