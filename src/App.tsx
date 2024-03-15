import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import router from "./Routes/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lightTheme, theme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const Globalstyle = createGlobalStyle`
 ${reset}

*{
  box-sizing: border-box;
}
  body{
    background: ${(props) => props.theme.bgColor};
    font-family: "Source Code Pro", monospace;
  }
  a{
    text-decoration: none;
    color: inherit
  }
 

`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? theme : lightTheme}>
        <Globalstyle />
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;

// import React, { useState } from "react";
// import Router from "./Router";
// import { ThemeProvider, createGlobalStyle } from "styled-components";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { HelmetProvider } from "react-helmet-async";
// import { lightTheme, darkTheme } from "./theme";
// import { useRecoilValue } from "recoil";
// import { isDarkAtom } from "./atoms";

// const GlobalStyle = createGlobalStyle`

// html, body, div, span, applet, object, iframe,
// h1, h2, h3, h4, h5, h6, p, blockquote, pre,
// a, abbr, acronym, address, big, cite, code,
// del, dfn, em, img, ins, kbd, q, s, samp,
// small, strike, strong, sub, sup, tt, var,
// b, u, i, center,
// dl, dt, dd, ol, ul, li,
// fieldset, form, label, legend,
// table, caption, tbody, tfoot, thead, tr, th, td,
// article, aside, canvas, details, embed,
// figure, figcaption, footer, header, hgroup,
// menu, nav, output, ruby, section, summary,
// time, mark, audio, video {
// 	margin: 0;
// 	padding: 0;
// 	border: 0;
// 	font-size: 100%;
// 	font: inherit;
// 	vertical-align: baseline;
// }
// /* HTML5 display-role reset for older browsers */
// article, aside, details, figcaption, figure,
// footer, header, hgroup, menu, nav, section {
// 	display: block;
// }
// body {
// 	line-height: 1;
// }
// ol, ul {
// 	list-style: none;
// }
// blockquote, q {
// 	quotes: none;
// }
// blockquote:before, blockquote:after,
// q:before, q:after {
// 	content: '';
// 	content: none;
// }
// table {
// 	border-collapse: collapse;
// 	border-spacing: 0;
// }
// *{
//   box-sizing:border-box
// }
// body{
// 	font-family: "Cute Font", sans-serif;
//   background-color:${(props) => props.theme.bgColor};
//   color:${(props) => props.theme.textColor}
// }
// a{
//   text-decoration:none;
//   color:inherit;
// }
// `;

// function App() {
//   const isDark = useRecoilValue(isDarkAtom);
//   return (
//     <>
//       <HelmetProvider>
//         <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
//           <GlobalStyle />
//           <Router />
//           <ReactQueryDevtools initialIsOpen={true} />
//         </ThemeProvider>
//       </HelmetProvider>
//     </>
//   );
// }

// export default App;
