// pages/tasks.js
"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/task?q=ALL");
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        setError("Ошибка при загрузке заданий");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Head>
        <title>Список задач - Математический анализ</title>
        <meta
          name="description"
          content="Список задач для обучения математическому анализу"
        />
      </Head>

      <main className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Список задач</h1>
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : tasks.length === 0 ? (
            <p>Нет доступных задач</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4">
              {tasks.map((task) => (
                <li key={task.id} className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">{task.text}</h2>
                  <div className="text-gray-600 mb-2 flex">
                    Урок:
                    <Link href={`/lessons/${task.lessonId}`}>
                      <div className="text-blue-500 hover:underline mx-1">
                        "{task.lessonName}"
                      </div>
                    </Link>
                  </div>
                  <p className="text-gray-600">Сложность: {task.difficulty}</p>
                  <div className="mt-2">
                    <Link href={`/lessons/${task.id}`}>
                      <div className="text-blue-500 hover:underline">
                        Подробнее
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* <div className="grid gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="border p-4 rounded-md">
                <Link href={`/tasks/${task.id}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors duration-300 ease-out">
                    {task.text}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-2">{task.solution}</p>
                <div className="text-gray-600 mb-2 flex">
                  Урок:{" "}
                  <Link href={`/lessons/${task.lessonId}`}>
                    <div className="text-blue-500 hover:underline mx-1">
                      {task.lessonName}
                    </div>
                  </Link>
                </div>
                <p className="text-gray-600 mb-2">Автор: {task.authorName}</p>
              </div>
            ))}
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default TasksPage;
