import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../src/components/navbar";
import { describe } from "node:test";

describe("NavBar", () => {

  /* Check if the Navbar is present */
  it("should render the navbar", () => {
    render(<NavBar />);

    const navBar = screen.getByRole("navigation");

    expect(navBar).toBeInTheDocument();
  });


  /* Check if the Navbar contains the Login link */
  it("should contain login link", () => {
    render(<NavBar />);

    const navBar = screen.getByText("Login");

    expect(navBar).toBeInTheDocument();

    expect(navBar).toHaveAttribute("href", "/login");
  });


  /* Check if the Navbar contains the sign up link */
  it("should contain Sign up link", () => {
    render(<NavBar />);

    const navBar = screen.getByText("Sign up");

    expect(navBar).toBeInTheDocument();

    expect(navBar).toContainHTML("button");
  });
});