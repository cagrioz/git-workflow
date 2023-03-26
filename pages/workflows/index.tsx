import axios from "axios";

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
    console.log(workflows);

    return (
        <div className="container mx-auto">
            <h1 className="text-5xl my-12 font-bold">Workflows</h1>

            <div className="flex flex-col gap-5">
                {workflows.map((workflow: any, i: number) => (
                    <div className="flex flex-col gap-2 py-10 px-16 bg-slate-200" key={i}>
                        <a href={`/workflows/${workflow._workflowId}`} className="text-2xl font-bold text-gray-900">
                            {workflow._workflowName}
                        </a>
                        <p className="text-gray-700">{workflow.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Workflows;
