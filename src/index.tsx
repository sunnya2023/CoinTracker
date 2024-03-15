import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { ThemeProvider } from "styled-components";
// import { Theme } from "./theme";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { RecoilRoot } from 'recoil';

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <QueryClientProvider client={queryClient}>
//         {/* <ThemeProvider theme={Theme}> */}
//           <App />
//         {/* </ThemeProvider> */}
//       </QueryClientProvider>
//     </RecoilRoot>
//   </React.StrictMode>
// );
