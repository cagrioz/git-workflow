import axios from "axios";
import Branch from "@app/components/Exercises/Branch";
import Commit from "@app/components/Exercises/Commit";
import Merge from "@app/components/Exercises/Merge";
import SnackbarProvider from "react-simple-snackbar";

import { capitalize } from "lodash";
import Header from "@app/components/Header";
import Footer from "@app/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@app/contexts/AuthContext";
import CommitMerge from "@app/components/Exercises/CommitMerge/CommitMerge";
import StageAndCommit from "@app/components/Exercises/StageAndCommit/StageAndCommit";
import PullBranchStageCommitMerge from "@app/components/Exercises/PullBranchStageCommitMerge/PullBranchStageCommitMerge";
import CreateDeleteBranch from "@app/components/Exercises/CreateDeleteBranch/CreateDeleteBranch";
import PullCommitPush from "@app/components/Exercises/PullCommitPush/PullCommitPush";
import StageAndCommitSpecificFile from "@app/components/Exercises/StageAndCommitSpecificFile/StageAndCommitSpecificFile";
import CloneRepo from "@app/components/Exercises/CloneRepo/CloneRepo";
import PullCommitPushTag from "@app/components/Exercises/PullStageCommitPushTag/PullStageCommitPushTag";

import { default as GFBranch } from "@app/components/GFExercises/Branch";
import Develop from "@app/components/GFExercises/Develop/Develop";
import Release from "@app/components/GFExercises/Release/Release";
import Production from "@app/components/GFExercises/Production/Production";

/*
export async function getServerSideProps({ params }: any) {
    const { workflow } = params;
    const res = await axios.get(`https://git-workflow-backend.onrender.com/
workflows/course?workflowName=${workflow}&userId=1`);
    const data = await res.data;

    return {
        props: {
            workflow: data,
            workflowName: workflow,
        },
    };
}

*/

const Workflow = () => {
    const router = useRouter();
    const { workflowName } = router.query;

    const auth = useAuth();

    const [score, setScore] = useState<any>(0);
    const [reset, setReset] = useState(false);
    const [workflowDetails, setWorkflowDetails] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkflowDetails = async () => {
            try {
                if (workflowName) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                        },
                        withCredentials: true,
                    };

                    const res = await axios.get(
                        `https://git-workflow-backend.onrender.com/workflows/course?workflowName=${workflowName}&userId=${auth.userId}`,
                        config
                    );
                    setWorkflowDetails(res.data);
                    console.log(res.data);
                    setScore(res.data.score.completed);
                    console.log("useeffect score", score);

                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWorkflowDetails();
    }, [workflowName, score]);

    function updateScore(score: number) {
        axios
            .post(
                "https://git-workflow-backend.onrender.com/workflows/",
                {
                    userId: auth.userId,
                    workflowName: workflowName,
                    score: score + 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log("sıuccess", res);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }

    const resetProgress = () => {
        setScore(0);
        updateScore(-1);
        setReset(!reset);
    };

    return (
        <>
            <Header loggedIn={true} />
            {!isLoading && (
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-primaryLight">
                            {score}/{workflowDetails?.score.total}
                        </span>
                        <h1 className="text-5xl my-12 font-medium text-primary text-center">
                            Workflow: {capitalize(workflowName as string)}
                        </h1>
                        <span
                            onClick={resetProgress}
                            className="bg-primaryLight hover:bg-primary duration-200 transition-all py-3 px-5 text-white font-medium rounded-2xl cursor-pointer"
                        >
                            Reset Progress
                        </span>
                    </div>
                    <div
                        className="text-xl mb-12 flex gap-5 flex-col py-6"
                        dangerouslySetInnerHTML={{ __html: workflowDetails?.workflow_description }}
                    ></div>

                    <SnackbarProvider>
                        <div className="flex flex-col gap-10">
                            {workflowDetails?.exercises?.length > 0 &&
                                workflowDetails?.exercises.map((exercise: any, index: number) => {
                                    return (
                                        <div className="flex flex-col gap-5" key={exercise.exerciseName}>
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-2xl font-bold text-primary">
                                                    {exercise.exerciseName}
                                                </h2>
                                                <p className="whitespace-pre-line mt-4 text-xl">
                                                    {exercise.explanation}
                                                </p>
                                            </div>
                                            {exercise.exerciseId === 1 && (
                                                <CloneRepo
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}

                                            {exercise.exerciseId === 2 && (
                                                <Branch
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 3 && (
                                                <Commit
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 4 && (
                                                <Merge
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 5 && (
                                                <CommitMerge
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 6 && (
                                                <StageAndCommit
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 7 && (
                                                <PullBranchStageCommitMerge
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 8 && (
                                                <CreateDeleteBranch
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}

                                            {exercise.exerciseId === 9 && (
                                                <StageAndCommitSpecificFile
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 10 && (
                                                <PullCommitPush
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 11 && (
                                                <PullCommitPushTag
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                            {exercise.exerciseId === 12 && (
                                                <Develop
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}

                                            {exercise.exerciseId === 13 && (
                                                <Release
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}

                                            {exercise.exerciseId === 14 && (
                                                <Production
                                                    active={index === score}
                                                    updateScore={() => {
                                                        setScore((prevScore: number) => prevScore + 1);
                                                        updateScore(score);
                                                    }}
                                                    reset={reset}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </SnackbarProvider>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Workflow;
