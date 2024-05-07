"use client";
import Head from "next/head";
import { useState } from "react";

const ProfilePage = () => {
  // Предположим, что у нас есть функция fetchUserData, которая загружает данные пользователя из базы данных
  const [userData, setUserData] = useState(null);

  // Предположим, что у нас есть функция updateUserProfile, которая обновляет данные пользователя в базе данных
  const updateUserProfile = async (updatedData) => {
    try {
      // Вызов функции для обновления данных пользователя
      await updateUserProfile(updatedData);
      // Обновление состояния с обновленными данными пользователя
      setUserData(updatedData);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  };

  // Загрузка данных пользователя при монтировании компонента
  useEffect(() => {
    fetchUserData().then((data) => setUserData(data));
  }, []);

  if (!userData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <Head>
        <title>Профиль - Математический анализ</title>
        <meta
          name="description"
          content="Страница профиля пользователя для управления личными данными"
        />
      </Head>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Профиль</h1>
        <div>
          <p>
            <strong>Имя:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          {/* Другие поля профиля */}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
          onClick={() => updateUserProfile(updatedData)}
        >
          Редактировать профиль
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;
