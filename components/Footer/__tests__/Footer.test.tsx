import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../";
// Using React testing library & Jest
// Jest provides the describe and test functions

describe("<Footer />", () => {
    // Unit tests for the footer component are implemented here

    test("renders the footer component", () => {
        render(<Footer />);

        // Testing if the footer component is rendered
        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeVisible();
    });

    test("renders the links in the footer", () => {
        render(<Footer />);
        // Testing if the link are rendered correctly
        const githubLink = screen.getByText("GitHub Workflow Teacher");
        expect(githubLink).toBeVisible();

        const privacyLink = screen.getByText("Privacy Policy");
        expect(privacyLink).toBeVisible();

        const termsLink = screen.getByText("Terms of Service");
        expect(termsLink).toBeVisible();

        const contactLink = screen.getByText("Contact Us");
        expect(contactLink).toBeVisible();
    });

    test("renders the copyright information with the correct year", () => {
        render(<Footer />);

        // Get current year
        const year = new Date().getFullYear();

        // Testing if the copyright is rendered with the correct year
        const copyright = screen.getByText(`© ${year} GitHub Workflow Teacher. All rights reserved.`);
        expect(copyright).toBeVisible();
    });

    test("testing accessibility of links in the Footer", () => {
        // Verifying the accessibility of the links
        render(<Footer />);

        const links = [
            { name: "GitHub Workflow Teacher" },
            { name: "Privacy Policy" },
            { name: "Terms of Service" },
            { name: "Contact Us" },
        ];

        links.forEach((link) => {
            const linkElement = screen.getByRole("link", { name: link.name });

            // Checking if the link has an href
            expect(linkElement).toHaveAttribute("href");
        });
    });
});
