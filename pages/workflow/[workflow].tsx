import axios from "axios";
import Branch from "@app/components/Exercises/Branch";
import Commit from "@app/components/Exercises/Commit";
import Merge from "@app/components/Exercises/Merge";
import SnackbarProvider from "react-simple-snackbar";

export async function getServerSideProps({ params }: any) {
    const { workflow } = params;
    const res = await axios.get(`http://localhost:8000/workflows/${workflow}`);
    const data = await res.data;

    return {
        props: {
            workflow: data,
        },
    };
}

const Workflow = ({ workflow }: any) => {
    console.log(workflow);
    return (
        <div className="container mx-auto">
            <h1 className="text-5xl my-12 font-medium">
                Workflow: <span className="font-bold"> {workflow.workflowName}</span>
            </h1>
            <div
                className="text-xl mb-12 flex gap-5 flex-col"
                dangerouslySetInnerHTML={{ __html: workflow.workflowDescription }}
            ></div>

            <SnackbarProvider>
                <div className="flex flex-col gap-10">
                    {workflow._exerciseList.length > 0 &&
                        workflow.exerciseList.map((exercise: any) => {
                            return (
                                <div className="flex flex-col gap-5" key={exercise.exerciseName}>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-4xl font-bold">{exercise.exerciseName}</h2>
                                        <p className="whitespace-pre-line mt-4">{exercise.description}</p>
                                    </div>
                                    {exercise.exerciseId === 1 && <Commit />}
                                    {exercise.exerciseId === 2 && <Branch />}
                                    {exercise.exerciseId === 3 && <Merge />}
                                </div>
                            );
                        })}
                </div>
            </SnackbarProvider>
        </div>
    );
};

export default Workflow;
