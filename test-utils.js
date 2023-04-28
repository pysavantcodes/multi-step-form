import React from "react";
import { render } from "@testing-library/react";
import FormDataProvider from "./src/context/FormDataContext";

const AllTheProviders = ({ children }) => {
  return <FormDataProvider>{children}</FormDataProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
