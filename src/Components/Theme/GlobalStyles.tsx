import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.5s ease-in, color 0.5s ease-in;
}

.btn-toggle {
    background-color: ${({ theme }) => theme.buttonBg };
    color: ${({ theme }) => theme.buttonTxt};
}

.form-control input[type="text"],
.form-control input[type="number"] {
    color: ${({ theme }) => theme.text }
}

.form-control input:valid + label span {
    color: ${({ theme }) => theme.text}
}

.players-container {
    background-color: ${({ theme }) => theme.flyoutBg };
    border-right-color: ${({ theme }) => theme.toggleBorder}
}

.stat {
    background-color: ${({ theme }) => theme.body };
    color: ${({ theme }) => theme.text};
    box-shadow: ${({ theme }) => theme.boxShadow };
}

`