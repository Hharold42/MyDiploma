// pages/tasks.js
"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const TasksPage = () => {
  const { data } = useSession();

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
        </div>
        {data && data.user.role === "ADMIN" && <Link className="" href={'/createTask'}>Создать задачу</Link>}
      </main>
    </div>
  );
};

export default TasksPage;
