import { styled } from "styled-components";

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  border-radius: 5px;
  padding: 7px;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: black;
  }
`;

// function Input(props: any) {
//   return <InputStyle {...props} />;
// }

export default Input;
