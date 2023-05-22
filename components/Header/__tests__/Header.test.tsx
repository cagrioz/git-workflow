import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../";
// Using React testing library & Jest
// Jest provides the describe and test functions 

describe("<Header />", () => {
  test("renders the logo when the user is not logged in", () => {
    render(<Header loggedIn={false} />);
    
    // Verifying that the logo is rendered
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});
