import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

class MyElement extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

window.customElements.define("mf-react", MyElement);
