import axios from "axios";
import Branch from "@app/components/Exercises/Branch";
import Commit from "@app/components/Exercises/Commit";
import Merge from "@app/components/Exercises/Merge";
import SnackbarProvider from "react-simple-snackbar";

import { capitalize } from "lodash";
import Header from "@app/components/Header";
import Footer from "@app/components/Footer";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }: any) {
    const { workflow } = params;
    const res = await axios.get(`http://localhost:8000/workflows/course?workflowName=${workflow}&userId=1`);
    const data = await res.data;

    console.log(data);

    return {
        props: {
            workflow: data,
            workflowName: workflow,
        },
    };
}

const Workflow = ({ workflow, workflowName }: any) => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        setScore(workflow.score.completed);
    }, []);

    // Update score
    useEffect(() => {
        axios
            .post("http://localhost:8000/workflows", {
                userId: 1,
                workflowName: workflowName,
                score: score,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [score]);

    return (
        <>
            <Header loggedIn={true} />
            <div className="container mx-auto relative">
                <span className="absolute top-0 left-0 text-3xl font-bold text-primaryLight">
                    {score}/{workflow.score.total}
                </span>
                <h1 className="text-5xl my-12 font-medium text-primary text-center">
                    Workflow: {capitalize(workflowName)}
                </h1>
                <div
                    className="text-xl mb-12 flex gap-5 flex-col"
                    dangerouslySetInnerHTML={{ __html: workflow.workflowDescription }}
                ></div>

                <SnackbarProvider>
                    <div className="flex flex-col gap-10">
                        {workflow.exercises?.length > 0 &&
                            workflow.exercises.map((exercise: any, index: number) => {
                                return (
                                    <div className="flex flex-col gap-5" key={exercise.exerciseName}>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-2xl font-bold text-primary">{exercise.explanation}</h2>
                                            <p className="whitespace-pre-line mt-4 text-xl">{exercise.exerciseName}</p>
                                        </div>
                                        {exercise.exerciseId === 1 && (
                                            <Commit active={index === score} updateScore={setScore} />
                                        )}
                                        {exercise.exerciseId === 2 && (
                                            <Branch active={index === score} updateScore={setScore} />
                                        )}
                                        {exercise.exerciseId === 3 && (
                                            <Merge active={index === score} updateScore={setScore} />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </SnackbarProvider>
            </div>
            <Footer />
        </>
    );
};

export default Workflow;
