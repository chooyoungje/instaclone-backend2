import { styled } from "styled-components";
import { BaseBox } from "../shared";
import { Link } from "react-router-dom";

const BottomBoxStyle = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  Link {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
    text-decoration: none;
    padding-left: 10px;
  }
`;

function BottomBox({ cta, link, linkText }: any) {
  return (
    <BottomBoxStyle>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </BottomBoxStyle>
  );
}

export default BottomBox;
