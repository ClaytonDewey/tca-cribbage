import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.buttonTxt};
  border-radius: 30px;
  cursor: pointer;
  font-size:1.4rem;
  padding: 1rem 2rem;
  text-transform: capitalize;
  font-weight: 700;
`;

const Toggle = ({theme, toggleTheme }) => {
    return (
        <Button className="btn-toggle" onClick={toggleTheme} >
            Switch Mode
        </Button>
    );
};
Toggle.protoTypes = {
    theme: string.isRequired
    , toggleTheme: func.isRequired
}
export default Toggle;