import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.5s ease-in, color 0.5s ease-in;
}
`