import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import { useAuth } from "@app/contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Exercises = () => {
    const [exercises, setExercises] = useState([]);
    const auth = useAuth();

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
    }, []);

    return (
        <>
            <Header loggedIn={true} />
            <div className="container mx-auto mb-16">
                <h1 className="text-5xl mt-24 mb-16 font-bold text-primary text-center">Exercises</h1>
                <div className="grid grid-cols-3 mt-10 gap-8">
                    {exercises.map((exercise: any, i: number) => (
                        <Link
                            href={`/exercises/${exercise.exerciseId}`}
                            className="flex flex-col justify-center rounded-2xl gap-2 py-10 px-16 bg-primaryLight hover:bg-primary transition-all duration-200 ease-in-out"
                            key={i}
                        >
                            <h3 className="text-3xl font-bold text-white">{exercise.exerciseName}</h3>
                            <p className="text-lg text-white">{exercise.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Exercises;
