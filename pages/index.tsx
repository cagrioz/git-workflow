import Head from "next/head";
import Commit from "../components/Exercises/Commit";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SnackbarProvider from "react-simple-snackbar";
import Branch from "../components/Exercises/Branch";

export default function Home() {
    return (
        <div>
            <Head>
                <title>GitHub Workflow Teacher</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen">
                <Header />

                <SnackbarProvider>
                    <div className="container mx-auto">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-4xl font-bold">Exercise 1 - Make 1 commit with message</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate,
                                        quod, quia, voluptates quae voluptatibus quibusdam voluptatum quos quas quidem
                                        nesciunt. Quisquam, quae.
                                    </p>
                                </div>
                                <Commit />
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-4xl font-bold">Exercise 2 - Create a new feature branch</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate,
                                        quod, quia, voluptates quae voluptatibus quibusdam voluptatum quos quas quidem
                                        nesciunt. Quisquam, quae.
                                    </p>
                                </div>
                                <Branch />
                            </div>
                        </div>
                    </div>
                </SnackbarProvider>

                <Footer />
            </div>
        </div>
    );
}
