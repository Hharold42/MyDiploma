"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isAvailable = await axios.get(
        `/api/checkUserExists?email=${email}&login=${login}`
      );
      if (isAvailable.data.code > 0) {
        await axios
          .post("/api/createUser", {
            email,
            password,
            login,
          })
          .then((res) => {
            if (res.data === true) {
              router.push("/");
            }
          });
      } else {
        setErrorMessage(isAvailable.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Регистрация - Математический анализ</title>
        <meta
          name="description"
          content="Страница регистрации на сайте для обучения математическому анализу"
        />
      </Head>

      <main className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Регистрация
          </h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}
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
              <label htmlFor="login" className="block text-gray-700">
                Придумайте логин
              </label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
          <div className="text-gray-600 text-center">
            Уже есть аккаунт?{" "}
            <Link href="/login">
              <div className="text-blue-500 hover:underline">Войдите</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
