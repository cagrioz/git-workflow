import Head from "next/head";
import Commit from "../components/Exercises/Commit";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SnackbarProvider from "react-simple-snackbar";
import Branch from "../components/Exercises/Branch";
import Merge from "../components/Exercises/Merge";
import { useEffect, useState } from "react";
import CommitMerge from "@app/components/Exercises/CommitMerge";

export default function Home() {
    const [exercises, setExercises] = useState<any[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    // Fetch exercises from API
    useEffect(() => {
        // Fetch localStorage id and username
        const userId = localStorage.getItem("id");
        const username = localStorage.getItem("username");

        if (userId && username) {
            console.log("User is logged in");
            setLoggedIn(true);
        } else {
            window.location.href = "/login";
        }

        fetch("http://localhost:8000/exercises")
            .then((res) => res.json())
            .then((data) => setExercises(data));
    }, []);

    return (
        <div>
            <Head>
                <title>GitHub Workflow Teacher</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen">
                <Header loggedIn={loggedIn} />

                <SnackbarProvider>
                    <div className="container mx-auto">
                        <div className="flex flex-col gap-10">
                            {exercises.length > 0 &&
                                exercises.map((exercise) => {
                                    return (
                                        <div className="flex flex-col gap-5" key={exercise._exerciseName}>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-4xl font-bold">{exercise._exerciseName}</h2>
                                                <p className="whitespace-pre-line mt-4">{exercise._description}</p>
                                            </div>
                                            {exercise._exerciseId === 1 && (
                                                <Commit active={true} updateScore={function () {}} reset={true} />
                                            )}
                                            {exercise._exerciseId === 2 && (
                                                <Branch active={true} updateScore={function () {}} reset={true} />
                                            )}
                                            {exercise._exerciseId === 3 && (
                                                <Merge active={true} updateScore={function () {}} reset={true} />
                                            )}
                                        </div>
                                    );
                                })}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-4xl font-bold">
                                        Create a new branch and make 1 commit and merge
                                    </h2>
                                    <p className="whitespace-pre-line mt-4 max-w-5xl">
                                        Learn the process of creating a new feature branch in a Git repository, making
                                        one commit to it, and then using the git merge command to incorporate those
                                        changes into the master branch. This exercise will cover the basic workflow of
                                        branching, committing, and merging changes in Git, allowing you to effectively
                                        collaborate on code and make your changes available to others in the team.
                                    </p>
                                </div>
                                <CommitMerge />
                            </div>
                        </div>
                    </div>
                </SnackbarProvider>

                <Footer />
            </div>
        </div>
    );
}
