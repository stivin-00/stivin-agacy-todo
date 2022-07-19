import React, { useState, useEffect } from "react";
import {
  listTasks,
  addaTask,
  updateaTask,
  completeaTask,
  deleteTask,
} from "../actions/todoAction";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaCheck, FaTrashAlt } from "react-icons/fa";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";

const url = "http://localhost:3000/api/task";

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({ task: "" });
  const dispatch = useDispatch();

  const addTask = useSelector((state) => state.addTask);
  const updateTask = useSelector((state) => state.updateTask);
  const listTask = useSelector((state) => state.listTask);
  const TaskDelete = useSelector((state) => state.TaskDelete);
  // states
  const { alltasks, loading, error } = listTask;
  const { adding } = addTask;
  const { updating } = updateTask;
  const { deleting } = TaskDelete;

  useEffect(() => {
    console.log("listTask==>", listTask);
    dispatch(listTasks());
    console.log("tasks==>", tasks);
  }, [dispatch]);

  useEffect(() => {
    if (alltasks) {
      setTasks(alltasks.data);
      console.log(alltasks.data);
    }
  }, [listTask]);

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

  const addHandler = async (e) => {
    e.preventDefault();
    if (task._id) {
      try {
        await dispatch(updateaTask(task._id, task));
        dispatch(listTasks());
        setTask({ task: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(addaTask(task));
        setTask({ task: "" });
        dispatch(listTasks());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task._id === id);
    setTask(currentTask[0]);
  };

  const updateHandler = async (task) => {
    if (window.confirm("Hmmm..., Are sure you have completed this task? 😉")) {
      try {
        await dispatch(completeaTask(task._id, !task.completed));
        dispatch(listTasks());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteTask(id));
      dispatch(listTasks());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>ekele agbakwuru redux todo app </title>
        <meta
          name="description"
          content="simple to do app built by ekele agbakwuru stephen for agacy frontend test"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.heading}>EKELE/AGACY TO-DO REDUX BRANCH</h2>
        <div className={styles.container}>
          <form onSubmit={addHandler} className={styles.form_container}>
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
          {adding && <label>adding...</label>}
          {updating && <label>updating...</label>}
          {deleting && <label>deleting...</label>}
        </div>
        <div className={styles.form_box}>
          <div className={styles.container}>
            <h4 className={styles.form_heading}>pending tasks</h4>
            {pendingTasks.map((task) => (
              <div className={styles.task_container} key={task._id}>
                <button
                  onClick={() => updateHandler(task)}
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
                  onClick={() => deleteHandler(task._id)}
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
                <button className={styles.completed}>
                  <FaCheck />
                </button>
                <p className={styles.task_text}>{task.task}</p>
                <button
                  onClick={() => deleteHandler(task._id)}
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
