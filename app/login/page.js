// Файл: pages/login.js
"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (result.error) console.error("Ошибка аутентификации: ", result.error);
      else {
        console.log("Успешная аутентификация", result);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса: ", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Вход - Математический анализ</title>
        <meta
          name="description"
          content="Страница входа на сайт для обучения математическому анализу"
        />
      </Head>

      <main className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-center">Вход</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input std-input"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input std-input"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
              onClick={handleSubmit}
            >
              Войти
            </button>
          </div>
          <div className="text-gray-600 text-center">
            Нет аккаунта?{" "}
            <Link href="/register">
              <div className="text-blue-500 hover:underline">
                Зарегистрируйтесь
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
