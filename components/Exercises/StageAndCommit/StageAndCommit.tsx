import { GitgraphOptions, templateExtend } from "@gitgraph/core";
import { Gitgraph, Orientation, TemplateName } from "@gitgraph/react";
import { useEffect, useState } from "react";
import { useSnackbar } from "react-simple-snackbar";

const gitGraphOptions = {
    template: templateExtend(TemplateName.Metro, {
        colors: ["#666", "#0064e6", "#00ca00", "#F00"],
        branch: {
            lineWidth: 10,
            spacingX: 50,
            labelRotation: 0,
        },
    } as any),
    orientation: Orientation.Horizontal,
};

const supportedCommands = ["commit", "checkout", "merge", "branch"];
const supportedGraphCommands = ["add", "pull"];

// Git command validation
function validateCommand(command: string) {
    // Split commit message from command
    const message = command.split(" ");

    // Check if message is longer than 1
    if (message.length <= 1) {
        return false;
    }

    // Check if the first word is git
    if (message[0] !== "git") {
        return false;
    }

    // Check if the second word is a command
    if (!supportedCommands.includes(message[1]) && !supportedGraphCommands.includes(message[1])) {
        return false;
    }

    return true;
}

function StageAndCommit({ active, updateScore, reset }: { active: boolean; updateScore: any; reset: boolean }) {
    // Success snackbar
    const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar({
        style: {
            backgroundColor: "#4caf50",
            color: "#fff",
        },
    });

    // Error snackbar
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar({
        style: {
            backgroundColor: "#f44336",
            color: "#fff",
        },
    });

    const [branches, setBranches] = useState<any[]>([]);
    const [executedCommands, setExecutedCommands] = useState<string[]>([]);
    const [command, setCommand] = useState<string>("");
    const [exerciseCompleted, setExerciseCompleted] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(0);

    // Reset state variables when the reset prop changes
    useEffect(() => {
        if (reset) {
            setBranches([]);
            setExecutedCommands([]);
            setCommand("");
            setExerciseCompleted(false);
        }
    }, [reset]);

    const disabled = !active || exerciseCompleted ? true : false;

    function addCommand() {
        // Check if the command is valid
        if (!validateCommand(command)) {
            openErrorSnackbar("Command not valid");
            return;
        }

        if (currentStep === 0) {
            // Check if the command is correct
            const message = command.split("-b");
            const message2 = command.split("git branch ");

            if (message[0] == "git checkout " || (message2 && message2[1]?.length > 0)) {
                openSuccessSnackbar("Correct command! You can now continue to the next exercise");
            } else {
                openErrorSnackbar("Command not correct");
                return;
            }
        } else if (currentStep === 1) {
            const message = command.split("git add");

            if (!message[1]) {
                openErrorSnackbar("Command not correct");
                return;
            }

            openSuccessSnackbar("Correct command! You can now continue to the next exercise");
        } else if (currentStep === 2) {
            // Check if the command is correct
            const message = command.split("'");

            if (message[0] == "git commit -m ") {
                // Snackbar green background
                openSuccessSnackbar("Correct command! You can now continue to the next exercise");
            } else {
                openErrorSnackbar("Command not correct");
                return;
            }
        } else if (currentStep === 3) {
            // Check if the command is correct
            if (command == "git merge master") {
                openSuccessSnackbar("Correct command! You can now continue to the next exercise");
                setExerciseCompleted(true);
                updateScore();
            } else {
                openErrorSnackbar("Command not correct");
                return;
            }
        }

        setExecutedCommands([...executedCommands, command]);

        setCurrentStep((prevStep) => prevStep + 1);

        // Add the command to the status
        setCommand("");
    }

    return (
        <>
            <Gitgraph options={gitGraphOptions as GitgraphOptions} key={executedCommands.length}>
                {(gitgraph) => {
                    const master = gitgraph.branch("master");
                    setBranches([master]);
                    master.commit("Initial commit");

                    master.commit("Add index.html");

                    let newBranch: any;

                    executedCommands.forEach((command) => {
                        const message = command.split(" ");

                        if (message[1] === "commit") {
                            // Commit to the current branch that is active
                            gitgraph.commit(message[2]);
                        } else if (
                            (message[1] === "checkout" && message[2] === "-b") ||
                            (message[1] === "branch" && message[2].length > 0)
                        ) {
                            newBranch = master.branch(message[3] || message[2]).commit("New branch");

                            // Add the new branch to the list of branches if it doesn't exist
                            if (!branches.find((branch) => branch.name === newBranch.name)) {
                                setBranches([...branches, newBranch]);
                            }
                        } else if (message[1] === "checkout") {
                            const branch = branches.find((branch) => branch.name === message[2]);
                            if (branch) {
                                branch.checkout().commit("Checkout branch");
                            }
                        } else if (message[1] === "merge") {
                            master.merge(newBranch);
                        }
                    });
                }}
            </Gitgraph>
            <div className="flex flex-col">
                {exerciseCompleted && (
                    <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                        <p>Exercise completed</p>
                        <p>Answer:</p>
                        {executedCommands.map((el, i) => (
                            <p key={i}>{el}</p>
                        ))}
                    </div>
                )}
                <div
                    className={`justify-center items-center py-8 flex gap-5 my-5 ${
                        exerciseCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                >
                    <input
                        type="text"
                        className={`border-2 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none ${
                            exerciseCompleted ? "bg-gray-500" : "bg-white"
                        }}`}
                        placeholder="Enter git command"
                        onChange={(e) => setCommand(e.target.value)}
                        value={command}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addCommand();
                            }
                        }}
                        // Disable the input if the exercise is completed
                        disabled={exerciseCompleted}
                    />
                    {!disabled && (
                        <button
                            className={`text-white font-bold px-4 rounded h-9 ${
                                exerciseCompleted ? "bg-green-700 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
                            }`}
                            onClick={addCommand}
                            // Disable the button if the exercise is completed
                            disabled={disabled}
                        >
                            Add command
                        </button>
                    )}
                    {disabled && (
                        <button
                            className="text-white font-bold px-4 rounded h-9 bg-gray-500 hover:bg-gray-700"
                            disabled={disabled}
                        >
                            Not available
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
export default StageAndCommit;
