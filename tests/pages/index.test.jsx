import React from "react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import FormPage1 from "@/components/form-pages/FormPage1";
import { render, screen } from "../../test-utils";
import FormPage2 from "@/components/form-pages/FormPage2";
import FormPage3 from "@/components/form-pages/FormPage3";

describe("validate form in pages", () => {
  it("disables button if any field is empty in the first page (same could apply to other pages, but this is used as a case study)", () => {
    render(<FormPage1 />);
    const buttonElement = screen.getByRole("button");
    const emailInput = screen.getByLabelText("Email Address");
    const nameInput = screen.getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    expect(buttonElement).toBeDisabled();
  });

  test("display message when email field has an invalid mail", async () => {
    render(<FormPage1 />);
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const nameInput = screen.getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "invalid" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = await screen.findByText("Invalid email");
    expect(errorMessage).toBeInTheDocument();
  });

  test("do not display message when email field has a valid mail", async () => {
    render(<FormPage1 next={()=>{}}/>);
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const nameInput = screen.getByLabelText("Full Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@gmail.com" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = screen.queryByText("Invalid email");
    expect(errorMessage).toBeNull();
  });

  test("display message when phone number is invalid", async () => {
    render(<FormPage2 />);
    const phoneInput = screen.getByPlaceholderText("08012345678");
    const countryInput = screen.getByPlaceholderText("Country");
    fireEvent.change(countryInput, { target: { value: "Nigeria" } });
    fireEvent.change(phoneInput, { target: { value: "invalid" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = await screen.findByText("Invalid Phone Number");
    expect(errorMessage).toBeInTheDocument();
  });

  test("do not display message when phone number is valid", async () => {
    render(<FormPage2 next={()=>{}}/>);
    const phoneInput = screen.getByPlaceholderText("08012345678");
    const countryInput = screen.getByPlaceholderText("Country");
    fireEvent.change(countryInput, { target: { value: "Nigeria" } });
    fireEvent.change(phoneInput, { target: { value: "08012345678" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = screen.queryByText("Invalid Phone Number");
    expect(errorMessage).toBeNull();
  });

  test("display message when password and confirm password field do not tally", async () => {
    render(<FormPage3 />);
    const passwordInput = screen.getByPlaceholderText("**********");
    const confirmInput = screen.getByPlaceholderText("*********");
    fireEvent.change(passwordInput, { target: { value: "Nigeriaaaa" } });
    fireEvent.change(confirmInput, { target: { value: "invalidddd" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = await screen.findByText("Passwords do not match");
    expect(errorMessage).toBeInTheDocument();
  });

  test("do not display message when password and confirm password field tally", async () => {
    render(<FormPage3 next={()=>{}}/>);
    const passwordInput = screen.getByPlaceholderText("**********");
    const confirmInput = screen.getByPlaceholderText("*********");
    fireEvent.change(passwordInput, { target: { value: "Nigeriaaaa" } });
    fireEvent.change(confirmInput, { target: { value: "Nigeriaaaa" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage = screen.queryByText("Passwords do not match");
    expect(errorMessage).toBeNull();
  });

  test("display message when password is less than 8 characters", async () => {
    render(<FormPage3 />);
    const passwordInput = screen.getByPlaceholderText("**********");
    const confirmInput = screen.getByPlaceholderText("*********");
    fireEvent.change(passwordInput, { target: { value: "Nigeria" } });
    fireEvent.change(confirmInput, { target: { value: "Nigeria" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage2 = await screen.findByText(
      "Password must have at least 8 characters"
    );
    expect(errorMessage2).toBeInTheDocument();
  });

  test("do not display message when password is more than 8 characters", async () => {
    render(<FormPage3 next={()=>{}} />);
    const passwordInput = screen.getByPlaceholderText("**********");
    const confirmInput = screen.getByPlaceholderText("*********");
    fireEvent.change(passwordInput, { target: { value: "Nigeriaaa" } });
    fireEvent.change(confirmInput, { target: { value: "Nigeriaaa" } });
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    const errorMessage2 = screen.queryByText(
      "Password must have at least 8 characters"
    );
    expect(errorMessage2).toBeNull();
  });
});
