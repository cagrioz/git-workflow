import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../";

describe("Header - Navigation", () => {
    test("renders navigation links when the user is not logged in", () => {
        render(<Header loggedIn={false} />);

        // Verifying that the navigation links are rendered
        const homeLink = screen.getByText("Home");
        const workflowsLink = screen.getByText("Workflows");
        const exercisesLink = screen.getByText("Exercises");
        const loginLink = screen.getByText("Login");
        expect(homeLink).toBeVisible();
        // to be in documents will be to be visible
        expect(workflowsLink).toBeInTheDocument();
        expect(exercisesLink).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });

    test("renders additional links when the user is logged in", () => {
        render(<Header loggedIn={true} />);

        // Verifying that additional links are rendered
        const profileLink = screen.getByText("Profile");
        const createWorkflowLink = screen.getByText("Create Workflow");
        const logoutLink = screen.getByText("Logout");
        expect(profileLink).toBeInTheDocument();
        expect(createWorkflowLink).toBeInTheDocument();
        expect(logoutLink).toBeInTheDocument();
    });
});
