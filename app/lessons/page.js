// Файл: pages/lessons/index.js
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/api/lesson?q=ALL");
        setLessons(response.data);
      } catch (error) {
        console.error("Ошибка при получении уроков:", error);
        setError("Ошибка при загрузке уроков");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div>
      <Head>
        <title>Уроки - Математический анализ</title>
        <meta
          name="description"
          content="Уроки для обучения математическому анализу на сайте для обучения математическому анализу"
        />
      </Head>

      <main className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Уроки</h1>
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>{error}</p>
          ) : lessons.length === 0 ? (
            <p>Нет доступных уроков</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="mt-2">
                    <Link href={`/lessons/${lesson.id}`}>
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
      </main>
    </div>
  );
};

export default LessonsPage;
