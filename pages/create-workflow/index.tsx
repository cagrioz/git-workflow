import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import axios from "axios";
import Link from "next/link";

import { capitalize } from "lodash";
import { useEffect, useState } from "react";

const CreateWorkflow = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [exercises, setExercises] = useState<any>([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const res = await axios.get("http://localhost:8000/exercises", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setExercises(res.data);
        };

        if (localStorage.getItem("accessToken")) {
            fetchExercises();
            setIsAuthenticated(true);
            return;
        }

        setIsAuthenticated(false);

        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const selectedExercises: { [key: string]: string } = {};

        for (let i = 2; i < exercises.length + 2; i++) {
            if (e.target[i].checked) {
                selectedExercises[e.target[i].value] = e.target[i].name;
            }
        }

        axios
            .post(`http://localhost:8000/custom`, {
                userId: 4,
                workflowName: e.target[0].value,
                description: e.target[1].value,
                exercises: selectedExercises,
            })
            .then((res) => {
                console.log("res", res);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    return (
        <>
            {isAuthenticated ? (
                <>
                    {" "}
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
                                />
                                <input type="text" placeholder="Description" className="border-2 border-gray-300 p-2" />
                                {exercises.map((exercise: any, i: number) => (
                                    <div className="flex gap-2 items-center" key={i}>
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
                                            className="w-5 h-5"
                                        />
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
