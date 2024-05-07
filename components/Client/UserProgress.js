// Файл: components/UserProgress.js
"use client";

import { useEffect, useState } from "react";

const UserProgress = ({ userId }) => {
  // Предположим, что у нас есть функция fetchUserProgress, которая загружает данные о прогрессе пользователя из базы данных
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Загрузка данных о прогрессе пользователя при монтировании компонента
    fetchUserProgress(userId).then((data) => setProgress(data));
  }, [userId]);

  if (!progress) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Прогресс пользователя</h2>
      <div>
        <p>Пройденные уроки:</p>
        <ul>
          {progress.completedLessons.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <p>Выполненные задания:</p>
        <ul>
          {progress.completedTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
      <p>Процент прогресса: {progress.progressPercentage}%</p>
      <p>Оценка: {progress.grade}</p>
      {/* Другие показатели прогресса */}
    </div>
  );
};

export default UserProgress;
