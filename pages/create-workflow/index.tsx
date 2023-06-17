import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import axios from "axios";

import { capitalize } from "lodash";
import { useEffect, useState } from "react";
import { useAuth } from "@app/contexts/AuthContext";
import { useSnackbar } from "react-simple-snackbar";

const CreateWorkflow = () => {
    // Success snackbar
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar({
        style: {
            backgroundColor: "#4caf50",
            color: "#fff",
        },
    });

    const [exercises, setExercises] = useState<any>([]);
    const [workflowName, setWorkflowName] = useState<string>("");
    const [workflowDescription, setWorkflowDescription] = useState<string>("");

    const auth = useAuth();

    const handleDescriptionChange = (index: number, newDescription: string) => {
        setExercises((prevExercises: any) =>
            prevExercises.map((exercise: any, i: number) =>
                i === index ? { ...exercise, description: newDescription } : exercise
            )
        );

        console.log(exercises);
    };

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                };

                const res = await axios.get("https://git-workflow-backend.onrender.com/exercises", config);
                setExercises(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExercises();
    }, [auth.accessToken]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const selectedExercises: { [key: string]: string } = {};

        for (let i = 2; i < exercises.length + 2; i++) {
            if (e.target[i].checked) {
                selectedExercises[e.target[i].value] = e.target[i].dataset.description;
            }
        }

        axios
            .post(
                `https://git-workflow-backend.onrender.com/custom`,
                {
                    userId: auth.userId,
                    workflowName: workflowName,
                    description: workflowDescription,
                    exercises: selectedExercises,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                openSuccessSnackbar(`Successfully created workflow ${workflowName}`);
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    return (
        <>
            {auth.accessToken ? (
                <>
                    <Header loggedIn={true} />
                    <div className="container mx-auto mb-16">
                        <h1 className="text-5xl mt-16 mb-16 font-bold text-primary text-center">
                            Create Custom Workflow
                        </h1>
                        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Workflow Name"
                                    className="border-2 border-gray-300 p-2"
                                    value={workflowName}
                                    onChange={(e) => setWorkflowName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="border-2 border-gray-300 p-2"
                                    value={workflowDescription}
                                    onChange={(e) => setWorkflowDescription(e.target.value)}
                                />
                                {exercises.map((exercise: any, i: number) => (
                                    <div key={i}>
                                        <div className="flex gap-2 items-center">
                                            <label
                                                htmlFor={exercise.exerciseName}
                                                className="text-lg font-bold text-primary"
                                            >
                                                {capitalize(exercise.exerciseName)}
                                            </label>
                                            <input
                                                type="checkbox"
                                                id={exercise.exerciseName}
                                                name={exercise.exerciseName}
                                                value={exercise.exerciseId}
                                                data-description={exercise.description}
                                                className="w-5 h-5"
                                            />
                                        </div>
                                        <textarea
                                            onChange={(e) => handleDescriptionChange(i, e.target.value)}
                                            className="w-full h-20 border border-gray-300 p-2"
                                            value={exercises[i].description}
                                        ></textarea>
                                    </div>
                                ))}
                                <button className="bg-primary text-white py-2 px-4 rounded-lg">Create Workflow</button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </>
            ) : (
                <h1>Not authenticated</h1>
            )}
        </>
    );
};

export default CreateWorkflow;
