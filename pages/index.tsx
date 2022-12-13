import { Gitgraph, Orientation, TemplateName } from "@gitgraph/react";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
    const [status, setStatus] = useState<string[]>(["Initial command"]);
    const [command, setCommand] = useState<string>("");

    function addCommand() {
        setStatus([...status, command]);
        setCommand("");
    }

    return (
        <div>
            <Head>
                <title>GitHub Workflow Teacher</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="mx-auto text-center">
                <input
                    type="text"
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    placeholder="command Message"
                    onChange={(e) => setCommand(e.target.value)}
                    value={command}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={addCommand}
                >
                    Add command
                </button>
            </div>
            <Gitgraph options={{}} key={status.length}>
                {(gitgraph) => {
                    // Simulate git commands with Gitgraph API.
                    const master = gitgraph.branch("master");
                    master.commit("Initial commit");

                    /* TODO: Implement the complex ops, and checks with branch system */
                    status.forEach((command) => {
                        if (command.includes("git commit")) {
                            master.commit(command);
                        } else if (command.includes("git checkout")) {
                            const dev = master.branch("dev").commit('Branch "dev" created');
                        } else if (command.includes("git merge")) {
                            master.merge(command);
                        }
                    });
                }}
            </Gitgraph>
            <Footer />
        </div>
    );
}
