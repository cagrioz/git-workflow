import Header from "@app/components/Header";
import Workflows from "@app/components/Workflows";

function Homepage() {
    return (
        <section>
            <h1>Homepage</h1>
            <Header loggedIn={true} />
            <Workflows />
        </section>

    );
}
export default Homepage;
