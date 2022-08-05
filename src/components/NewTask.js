import AddTask from "./AddTask";
import useHttp from "../hooks/use-http";

const API_URL = process.env.API_URL;

const NewTask = (props) => {
  const {
    isLoading,
    dataSent,
    error,
    sendRequest: sendTaskRequest,
  } = useHttp();

  const taskTransformer = (task, taskData) => {
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, ...task };
    props.onAddTask(createdTask);
  };

  const sendTaskHandler = async (task) => {
    sendTaskRequest(
      {
        url: API_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: task,
      },
      taskTransformer.bind(null, task)
    );
  };

  return (
    <AddTask
      onSendTask={sendTaskHandler}
      loading={isLoading}
      dataSent={dataSent}
    ></AddTask>
  );
};

export default NewTask;
