// Файл: pages/lessons/[id].js
"use client";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi"; // Импортируем иконку

const LessonDetailPage = ({ params: { id } }) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`/api/lesson?q=${id}`);
        console.log(response);
        setLesson(response.data);
      } catch (error) {
        console.error("Ошибка при получении урока:", error);
        setError("Ошибка при загрузке урока");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  return (
    <div>
      <Head>
        <title>{lesson ? lesson.title : "Урок"} - Математический анализ</title>
        <meta
          name="description"
          content={
            lesson
              ? lesson.description
              : "Урок на сайте для обучения математическому анализу"
          }
        />
      </Head>

      <main className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-4">
            <Link href="/lessons">
              <div className="flex items-center text-blue-500 hover:underline">
                <FiArrowLeft className="mr-2" /> Назад
              </div>
            </Link>
          </div>
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : lesson ? (
            <div className="bg-white p-8 rounded-md shadow-md">
              <h1 className="text-3xl font-semibold mb-4">{lesson.title}</h1>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <h2 className="text-xl font-semibold mb-2">Материалы:</h2>
              <ul className="list-disc pl-6">
                {lesson.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
                {lesson.tasks.map((task, index) => (
                  <li key={`t${index}`} className="text-blue-600">
                    <Link href={`/tasks/${task.id}`}>{task.text}</Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4">Сложность: {lesson.difficulty}</p>
            </div>
          ) : (
            <p>Урок не найден</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonDetailPage;
