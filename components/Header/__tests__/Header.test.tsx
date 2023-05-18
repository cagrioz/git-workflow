import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../";

describe("<Header />", () => {
    test("renders logo", () => {
        render(<Header loggedIn={false} />);
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeInTheDocument();
    });
});
