import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

export function render(_url: string) {
  const html = renderToString(
    <MemoryRouter initialEntries={[_url]}>
      <StrictMode>
        <App />
      </StrictMode>
    </MemoryRouter>,
  );
  return { html };
}
