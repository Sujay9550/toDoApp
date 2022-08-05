import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import Footer from "./components/Footer";
import useHttp from "./hooks/use-http";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import addTaskIcon from "./icons/add-task.png";
import tasksIcon from "./icons/todo-list.png";

const API_URL = process.env.API_URL;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({
          id: taskKey,
          title: tasksObj[taskKey].title,
          dueDate: tasksObj[taskKey].dueDate,
          description: tasksObj[taskKey].description,
          status: tasksObj[taskKey].status,
        });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: API_URL,
      },
      transformTasks
    );
  }, []);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.concat(task);
    });
  };

  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  let content = (
    <tbody>
      <tr>
        <td>No tasks found.</td>
      </tr>
    </tbody>
  );

  if (tasks.length > 0) {
    content = (
      <TaskList tasks={tasks} onDeleteTask={deleteTaskHandler}></TaskList>
    );
  }

  if (error) {
    content = (
      <tbody>
        <tr>
          <td>{error}</td>
        </tr>
      </tbody>
    );
  }

  if (isLoading) {
    content = (
      <tbody>
        <tr>
          <td>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <div className="container app-container mt-4 p-5">
      <Header></Header>
      <div className="row">
        <div className="col-lg-4">
          <div className="container new-task-container border mt-3 mb-3">
            <div className="row">
              <div className="col-lg-12">
                <h5 className="text-center text-secondary mt-3">
                  <img src={addTaskIcon} /> Add New Task
                </h5>
                <NewTask onAddTask={addTaskHandler}></NewTask>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="container task-list-container border mt-3 mb-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="task-list-image-container text-center mt-3">
                  <img src={tasksIcon} />
                </div>
                <div className="table-responsive-lg">
                  <table className="table caption-top task-table table-sm">
                    <caption>Your Task List</caption>
                    <thead className="table-head">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    {content}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
