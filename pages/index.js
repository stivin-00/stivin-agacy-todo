import React, { useState, useEffect } from "react";
import { FaEdit, FaCheck, FaTrashAlt } from "react-icons/fa";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";

const url = "https://stivin-agacy-todo.vercel.app/api/task";

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({ task: "" });

  useEffect(() => {
    if (tasks) {
      const pendingTasks = tasks.filter((item) => !item.completed);
      setPendingTasks(pendingTasks);
      const completedTasks = tasks.filter((item) => item.completed);
      setCompletedTasks(completedTasks);
    }
  }, [tasks]);

  const handleChange = ({ currentTarget: input }) => {
    input.value === ""
      ? setTask({ task: "" })
      : setTask((prev) => ({ ...prev, task: input.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (task._id) {
        const { data } = await axios.put(url + "/" + task._id, {
          task: task.task,
        });
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === task._id);
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        setTask({ task: "" });
        console.log(data.message);
      } else {
        const { data } = await axios.post(url, task);
        setTasks((prev) => [...prev, data.data]);
        setTask({ task: "" });
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task._id === id);
    setTask(currentTask[0]);
  };

  const updateTask = async (id) => {
    if (window.confirm("Hmmm..., Are sure you have completed this task? 😉")) {
      try {
        const originalTasks = [...tasks];
        const index = originalTasks.findIndex((t) => t._id === id);
        const { data } = await axios.put(url + "/" + id, {
          completed: !originalTasks[index].completed,
        });
        originalTasks[index] = data.data;
        setTasks(originalTasks);
        console.log(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + "/" + id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>ekele agbakwuru todo app </title>
        <meta
          name="description"
          content="simple to do app built by ekele agbakwuru stephen for agacy frontend test"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>EKELE/AGACY TO-DO</h1>
        <div className={styles.container}>
          <form onSubmit={addTask} className={styles.form_container}>
            <input
              className={styles.input}
              type="text"
              placeholder="Task to be done..."
              onChange={handleChange}
              value={task.task}
            />
            <button type="submit" className={styles.submit_btn}>
              {task._id ? "Update" : "Add"}
            </button>
          </form>
        </div>
        <div className={styles.form_box}>
          <div className={styles.container}>
            <h4 className={styles.form_heading}>pending tasks</h4>
            {pendingTasks.map((task) => (
              <div className={styles.task_container} key={task._id}>
                <button
                  onClick={() => updateTask(task._id)}
                  className={styles.complete}
                >
                  <FaCheck />
                </button>
                <p className={styles.task_text}>{task.task}</p>
                <button
                  onClick={() => editTask(task._id)}
                  className={styles.edit_task}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className={styles.remove_task}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <h2 className={styles.no_tasks}>No pending tasks</h2>
            )}
          </div>
          {/* completed todos */}
          <div className={styles.container}>
            <h4 className={styles.form_heading}>completed tasks</h4>

            {completedTasks.map((task) => (
              <div className={styles.task_container} key={task._id}>
                <button
                  className={styles.completed}
                >
                  <FaCheck />
                </button>
                <p className={styles.task_text}>{task.task}</p>
                <button
                  onClick={() => deleteTask(task._id)}
                  className={styles.remove_task}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <h2 className={styles.no_tasks}>No completed tasks</h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(url);
  return {
    props: {
      tasks: data.data,
    },
  };
};
