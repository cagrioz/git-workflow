import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import axios from "axios";
import Link from "next/link";

import { capitalize } from "lodash";

export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:8000/exercises`);
    const data = await res.data;

    return {
        props: {
            exercises: data,
        },
    };
}

const CreateWorkflow = ({ exercises }: any) => {
    console.log(exercises);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Get localStorage id
        const id = localStorage.getItem("id");

        if (id) {
            return;
        }

        const selectedExercises: { [key: string]: string } = {};

        for (let i = 2; i < exercises.length + 2; i++) {
            if (e.target[i].checked) {
                selectedExercises[e.target[i].value] = e.target[i].name;
            }
        }

        axios
            .post(`http://localhost:8000/custom`, {
                userId: 1,
                workflowName: e.target[0].value,
                description: e.target[1].value,
                exercises: selectedExercises,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header loggedIn={true} />
            <div className="container mx-auto mb-16">
                <h1 className="text-5xl mt-16 mb-16 font-bold text-primary text-center">Create Custom Workflow</h1>
                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <input type="text" placeholder="Workflow Name" className="border-2 border-gray-300 p-2" />
                        <input type="text" placeholder="Description" className="border-2 border-gray-300 p-2" />
                        {exercises.map((exercise: any, i: number) => (
                            <div className="flex gap-2 items-center" key={i}>
                                <label htmlFor={exercise.exerciseName} className="text-lg font-bold text-primary">
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
    );
};

export default CreateWorkflow;
