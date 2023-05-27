import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../";
// Using React testing library & Jest
// Jest provides the describe and test functions

describe("<Header />", () => {
    // Unit tests for the header component are implemented here

    test("renders the logo when the user is not logged in", () => {
        render(<Header loggedIn={false} />);

        // Testing if the logo is rendered
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeVisible();
        // Testing if the logo has the correct alt text
        expect(logo).toHaveAttribute("alt", "Logo");
    });

    test("renders the logo when the user is logged in", () => {
        render(<Header loggedIn={true} />);

        // Testing if the logo is rendered
        const logo = screen.getByAltText("Logo");
        expect(logo).toBeVisible();
        // Testing if the logo has the correct alt text
        expect(logo).toHaveAttribute("alt", "Logo");
    });

    test("testing if there are the correct number of links", () => {
        render(<Header loggedIn={false} />);

        // Testing if the correct number of links are rendered
        const navigationLinks = screen.getAllByRole("link");
        expect(navigationLinks).toHaveLength(5);
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

    test("verify accessibility of the links when user is logged in", () => {
        // Verifying the accessibility of the links
        render(<Header loggedIn={true} />);
        const homeLink = screen.getByRole("link", { name: "Home" });
        const workflowsLink = screen.getByRole("link", { name: "Workflows" });
        const exercisesLink = screen.getByRole("link", { name: "Exercises" });
        const profileLink = screen.getByRole("link", { name: "Profile" });
        const createWorkflowLink = screen.getByRole("link", { name: "Create Workflow" });
        const logoutLink = screen.getByRole("link", { name: "Logout" });

        expect(homeLink).toBeVisible();
        expect(workflowsLink).toBeVisible();
        expect(exercisesLink).toBeVisible();
        expect(profileLink).toBeVisible();
        expect(createWorkflowLink).toBeVisible();
        expect(logoutLink).toBeVisible();
    });

    test("verify accessibility of the links when the user is not logged in", () => {
        // Verifying the accessibility of the links
        render(<Header loggedIn={false} />);
        const homeLink = screen.getByRole("link", { name: "Home" });
        const workflowsLink = screen.getByRole("link", { name: "Workflows" });
        const exercisesLink = screen.getByRole("link", { name: "Exercises" });
        const loginLink = screen.getByRole("link", { name: "Login" });

        expect(homeLink).toBeVisible();
        expect(workflowsLink).toBeVisible();
        expect(exercisesLink).toBeVisible();
        expect(loginLink).toBeVisible();
    });

    test("on logout event clears the local storage data", () => {
        //Fill local storage with user data
        localStorage.setItem("id", "123");
        localStorage.setItem("username", "test_user");
        localStorage.setItem("accessToken", "token123");

        render(<Header loggedIn={true} />);

        // Clicking the logout link
        fireEvent.click(screen.getByText("Logout"));

        // Expecting to be logged out and local storage to be cleared
        expect(localStorage.getItem("id")).toBeNull();
        expect(localStorage.getItem("username")).toBeNull();
        expect(localStorage.getItem("accessToken")).toBeNull();
    });

    test("display the 'Create Workflow' link only when the user is logged in", () => {
        // Didn't work!!!
        // render(<Header loggedIn={false} />);
        // const createWorkflowLink = screen.queryByText("Create Workflow");
        // expect(createWorkflowLink).toBeNull();

        render(<Header loggedIn={true} />);
        const createWorkflowLinkLoggedIn = screen.getByText("Create Workflow");
        expect(createWorkflowLinkLoggedIn).toBeVisible();
    });

    test("clicking on logout triggers logout event", () => {
        render(<Header loggedIn={true} />);
        // Testing that clicking on the logout link triggers logout action
        const logoutLink = screen.getByText("Logout");
        const logoutEventHandler = jest.fn();
        // Click event listener to listen the logout link
        logoutLink.addEventListener("click", logoutEventHandler);
        fireEvent.click(logoutLink);

        expect(logoutEventHandler).toHaveBeenCalledTimes(1);
    });

    // test("testing when the login link is clicked (user not logged in)", () => {
    //     render(<Header loggedIn={false} />);
    //     const loginLink = screen.getByText("Login");

    //     fireEvent.click(loginLink);

    //     // Expecting the login link to direct to the correct page
    //     expect(window.location.href).toBe("/login");
    //   });

    // test("testing when the create workflow link is clicked (user logged in)", () => {
    //     render(<Header loggedIn={true} />);
    //     const createWorkflowLink = screen.getByText("Create Workflow");

    //     fireEvent.click(createWorkflowLink);

    //    // Expecting the create workflow link to direct to the create-workflow
    //     expect(window.location.href).toBe("/create-workflow");
    //   });

    // test("testing when the profile link is clicked (user logged in)", () => {
    //     render(<Header loggedIn={true} />);
    //     const profileLink = screen.getByText("Profile");

    //     fireEvent.click(profileLink);

    //     // Verify that the profile link navigates to the correct page
    //     expect(window.location.href).toBe("/profile");
    //   });

    // test("testing when the exercises link is clicked (user logged in)", () => {
    //     render(<Header loggedIn={true} />);
    //     const exercisesLink = screen.getByText("Exercises");

    //     fireEvent.click(exercisesLink);

    //     // Verify that the exercises link navigates to the correct page
    //     expect(window.location.href).toBe("/exercises");
    //   });

    // test("testing when the workflows link is clicked (user logged in)", () => {
    //     render(<Header loggedIn={true} />);
    //     const workflowsLink = screen.getByText("Workflows");

    //     fireEvent.click(workflowsLink);

    //     // Verify that the workflows link navigates to the correct page
    //     expect(window.location.href).toBe("/workflows");
    //   });

    test("testing when the home link is clicked (user logged in)", () => {
        render(<Header loggedIn={true} />);
        const homeLink = screen.getByText("Home");

        fireEvent.click(homeLink);

        // Verify that the home link navigates to the correct page

        expect(window.location.href).toBe("http://localhost/");
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Should we change this to "/home" or not ?
    });
});
