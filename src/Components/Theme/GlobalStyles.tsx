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

.stat {
    background-color: ${({ theme }) => theme.text };
    color: ${({ theme }) => theme.body};
    box-shadow: ${({ theme }) => theme.boxShadow };
}

`