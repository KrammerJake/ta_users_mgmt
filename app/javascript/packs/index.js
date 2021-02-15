// Run this example by adding <%= javascript_pack_tag 'index' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxStoreProvider } from "react-redux";
import App from "../components/App";
import { store } from "../redux/store";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ReduxStoreProvider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ReduxStoreProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
