import axios from "axios";
import Branch from "../../components/Exercises/Branch";
import Commit from "../../components/Exercises/Commit";
import Merge from "../../components/Exercises/Merge";
import SnackbarProvider from "react-simple-snackbar";

export async function getServerSideProps({ params }: any) {
    const { workflow } = params;
    const res = await axios.get(`http://localhost:8000/workflow/${workflow}`);
    const data = await res.data;

    console.log(workflow);

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
                Workflow: <span className="font-bold"> {workflow._workflowName}</span>
            </h1>
            <p className="text-xl">{workflow._workflowDescription}</p>
            <SnackbarProvider>
                <div className="flex flex-col gap-10">
                    {workflow._exerciseList.length > 0 &&
                        workflow._exerciseList.map((exercise: any) => {
                            return (
                                <div className="flex flex-col gap-5" key={exercise._exerciseName}>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-4xl font-bold">{exercise._exerciseName}</h2>
                                        <p className="whitespace-pre-line mt-4">{exercise._description}</p>
                                    </div>
                                    {exercise._exerciseId === 1 && <Commit />}
                                    {exercise._exerciseId === 2 && <Branch />}
                                    {exercise._exerciseId === 3 && <Merge />}
                                </div>
                            );
                        })}
                </div>
            </SnackbarProvider>
        </div>
    );
};

export default Workflow;
