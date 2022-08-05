import Task from "./Task";

const TaskList = (props) => {
  return (
    <tbody>
      {props.tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            dueDate={task.dueDate}
            description={task.description}
            status={task.status}
            onDelete={props.onDeleteTask}
          ></Task>
        );
      })}
    </tbody>
  );
};

export default TaskList;
