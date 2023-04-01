import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:8000/workflows`);
    const data = await res.data;

    return {
        props: {
            workflows: data,
        },
    };
}

const Workflows = ({ workflows }: any) => {
    return (
        <>
            <Header loggedIn={true} />
            <div className="container mx-auto mb-16">
                <h1 className="text-5xl mt-24 mb-16 font-bold text-primary text-center">Workflows</h1>
                <div className="grid grid-cols-3 mt-10 gap-8">
                    {workflows.map((workflow: any, i: number) => (
                        <Link
                            href={`/workflow/${workflow.workflowId}`}
                            className="flex flex-col h-52 items-center justify-center rounded-2xl gap-2 py-10 px-16 bg-primaryLight hover:bg-primary transition-all duration-200 ease-in-out"
                            key={i}
                        >
                            <h3 className="text-2xl font-bold text-white">{workflow.workflowName}</h3>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Workflows;
