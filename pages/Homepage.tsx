import Header from "@app/components/Header";
import Workflows from "@app/components/Workflows";

function Homepage() {
    return (
        <section>
            <h1>Homepage</h1>
            <Header loggedIn={true} />
            <Workflows />
            <main>
                <p>Thank you for choosing our app! We're thrilled to have you join our community.</p>
                <p>Our app is designed to help you learn and master Git, a powerful version control system widely used in software development.</p>
                <p>With our app, you can embark on a journey to understand the fundamentals of Git workflows, practice various Git commands, and gain hands-on experience in managing code repositories effectively.</p>
                <p>Whether you're a beginner taking your first steps in version control or an experienced developer seeking to enhance your Git skills, our app provides a user-friendly interface and a comprehensive learning environment to cater to your needs.</p>
                <p>Here's what you can expect from our app:</p>
                <ul>
                    <li>Interactive Exercises: Dive into our structured courses that cover Git concepts, branching strategies, collaboration workflows, and more. Learn at your own pace and track your progress as you complete each module.</li>
                    <li>Hands-on Exercises: Put your knowledge into practice with our carefully crafted exercises. Use the integrated Git command editor to solve real-world scenarios and reinforce your understanding of Git commands and their applications.</li>
                    <li>Custom Workflows: Want to create your own workflows? Our app allows you to customize and tailor Git workflows to match your specific development needs. Define your steps, add exercises, and share your custom workflows with the community.</li>
                    <li>Score Tracking: Keep track of your achievements and monitor your progress with our built-in scoring system. Each completed exercise contributes to your overall score, giving you a sense of accomplishment as you advance through the app.</li>
                </ul>
                <p>Start your Git journey now and unlock the full potential of version control. We're here to support you every step of the way.</p>
                <p>Happy learning and happy coding!</p>
            </main>
        </section>

    );
}
export default Homepage;
