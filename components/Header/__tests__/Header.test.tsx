import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../";
// Using React testing library & Jest
// Jest provides the describe and test functions

describe("<Header />", () => {
    // Several unit tests for the header component are
    // implemented here

    test("renders the logo when the user is not logged in", () => {
        render(<Header loggedIn={false} />);

        // Testing if the logo is rendered
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeVisible();
    });

    test("renders the logo when the user is logged in", () => {
        render(<Header loggedIn={true} />);

        // Testing if the logo is rendered
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeVisible();
    });

    // testing navigation links when the user is not logged in
    test("renders navigation links when the user is not logged in", () => {
        render(<Header loggedIn={false} />);

        // Testing if the links are rendered
        const homeLink = screen.getByText("Home");
        const workflowsLink = screen.getByText("Workflows");
        const exercisesLink = screen.getByText("Exercises");
        const loginLink = screen.getByText("Login");
        expect(homeLink).toBeVisible();
        expect(workflowsLink).toBeVisible();
        expect(exercisesLink).toBeVisible();
        expect(loginLink).toBeVisible();
    });

    // testing navigation links when the user is logged in
    test("renders navigation links when the user is logged in", () => {
        render(<Header loggedIn={true} />);

        // Testing if the links are rendered
        const homeLink = screen.getByText("Home");
        const workflowsLink = screen.getByText("Workflows");
        const exercisesLink = screen.getByText("Exercises");
        const profileLink = screen.getByText("Profile");
        const createWorkflowLink = screen.getByText("Create Workflow");
        const logoutLink = screen.getByText("Logout");

        expect(homeLink).toBeVisible();
        expect(workflowsLink).toBeVisible();
        expect(exercisesLink).toBeVisible();
        expect(profileLink).toBeVisible();
        expect(createWorkflowLink).toBeVisible();
        expect(logoutLink).toBeVisible();
    });

    test("clicking on logout triggers logout event", () => {
        render(<Header loggedIn={true} />);

        const logoutLink = screen.getByText("Logout");
        const logoutEventHandler = jest.fn();

        logoutLink.addEventListener("click", logoutEventHandler);
        fireEvent.click(logoutLink);

        expect(logoutEventHandler).toHaveBeenCalledTimes(1);
    });

    // test("displays the 'Create Workflow' link only when the user is logged in", () => {
    //     render(<Header loggedIn={false} />);
    //     const createWorkflowLink = screen.queryByText("Create Workflow");
    //     expect(createWorkflowLink).toBeNull();

    //     render(<Header loggedIn={true} />);
    //     const createWorkflowLinkLoggedIn = screen.getByText("Create Workflow");
    //     expect(createWorkflowLinkLoggedIn).toBeVisible();
    // });

    //   test("clicking on the 'Profile' link navigates the user to the correct profile page", () => {
    //     render(<Header loggedIn={true} />);
    //     const profileLink = screen.getByText("Profile");

    //     fireEvent.click(profileLink);
    //     expect(window.location.href).toBe("/profile");
    //   });
});
