import { GitgraphOptions, templateExtend } from "@gitgraph/core";
import { Gitgraph, Orientation, TemplateName } from "@gitgraph/react";
import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";

const gitGraphOptions = {
    template: templateExtend(TemplateName.Metro, {
        colors: ["#666", "#0064e6", "#0F0", "#F00"],
        branch: {
            lineWidth: 10,
            spacingX: 50,
            labelRotation: 0,
        },
    } as any),
    orientation: Orientation.Horizontal,
};

const supportedCommands = ["commit", "checkout", "merge"];

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
    if (!supportedCommands.includes(message[1])) {
        return false;
    }

    return true;
}

function Merge() {
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

    function addCommand() {
        // Check if the command is valid
        if (!validateCommand(command)) {
            openErrorSnackbar("Command not valid");
            return;
        }

        // Check if the command is correct
        if (command == "git merge master") {
            openSuccessSnackbar("Correct command! You can now continue to the next exercise");
            setExerciseCompleted(true);
        } else {
            openErrorSnackbar("Command not correct");
            return;
        }

        setExecutedCommands([...executedCommands, command]);

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
                    const feature = gitgraph.branch("feature").commit("New feature");

                    executedCommands.forEach((command) => {
                        const message = command.split(" ");

                        if (message[1] === "commit") {
                            // Commit to the current branch that is active
                            master.commit(message[2]);
                        } else if (message[1] === "checkout" && message[2] === "-b") {
                            const newBranch = master.branch(message[3]).commit("New branch");

                            // Add the new branch to the list of branches if it doesn't exist
                            if (!branches.find((branch) => branch.name === newBranch.name)) {
                                setBranches([...branches, newBranch]);
                            }
                        } else if (message[1] === "checkout") {
                            const branch = branches.find((branch) => branch.name === message[2]);
                            if (branch) {
                                console.log(branch);
                                branch.checkout().commit("Checkout branch");
                            }
                        } else if (message[1] === "merge") {
                            master.merge(feature);
                        }
                    });
                }}
            </Gitgraph>
            <div className="flex flex-col">
                {exerciseCompleted && (
                    <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                        <p>Exercise completed</p>
                        <p>Answer: {executedCommands[0]}</p>
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
                    <button
                        className={` text-white font-bold px-4 rounded h-9 ${
                            exerciseCompleted ? "bg-green-700 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
                        }}`}
                        onClick={addCommand}
                        // Disable the button if the exercise is completed
                        disabled={exerciseCompleted}
                    >
                        Add command
                    </button>
                </div>
            </div>
        </>
    );
}
export default Merge;
