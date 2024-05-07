"use client";

import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const TaskDetailPage = ({ params: { id } }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await axios.get(`/api/task?q=${id}`);
        setTask(task.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  useEffect(() => {
    if (typeof window.MathJax !== "undefined") window.MathJax.typeset();
  }, []);

  return (
    <div>
      <Head>
        <title>
          {task ? task.title : "Task Detail"} - Математический анализ
        </title>
        <meta
          name="description"
          content={task ? `Страница с деталями задачи "${task.title}"` : ""}
        />
      </Head>

      <main className="container mx-auto py-8">
        {task ? (
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
            <p className="text-gray-600">{task.description}</p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Примеры уравнений:</h2>

              <div className="mb-4">
                <h3 className="text-lg font-medium">{`Уравнение ${
                  id + 1
                }:`}</h3>
                <p className="text-gray-600">{`Уравнение: ${task.text}`}</p>
                <p className="text-gray-600">{`Решение:  ${task.solution}`}</p>
              </div>
            </div>
          </article>
        ) : (
          <p>загрузка...</p>
        )}
      </main>
    </div>
  );
};

export default TaskDetailPage;
