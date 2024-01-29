import { styled } from "styled-components";

const Button = styled.input`
  border: none;

  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  font-size: 12px;
  width: 100%;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;

export default Button;
