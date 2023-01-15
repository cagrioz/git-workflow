import axios from "axios";

export async function getServerSideProps({ params }: any) {
    const { workflow } = params;
    //const res = await axios.get(`http://localhost:8000/workflow/${workflow}`);
    //const data = await res.data;

    return {
        props: {
            data: {
                workflowName: workflow,
            },
        },
    };
}

const Workflow = ({ data }: any) => {
    return (
        <div>
            <h1>Workflow : {data.workflowName}</h1>
        </div>
    );
};

export default Workflow;
