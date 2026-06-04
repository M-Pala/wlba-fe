import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import loaderVideo from "./assets/loader.mp4";
import App from "./App";
import { store } from "./redux/store";
import { ensureLoaderVideoReady } from "./utils/preloadMedia";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.css";

ensureLoaderVideoReady(loaderVideo);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
