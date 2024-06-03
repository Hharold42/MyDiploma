// Файл: components/Header.js
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 h-[80px]">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href="/" className="h-full flex flex-row items-center">
          <img src="image.png" className="h-full rounded-full mx-4" />
          <div className="text-xl font-bold">Математический анализ</div>
        </Link>

        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/lessons">
                <div className="hover:text-gray-300">Уроки</div>
              </Link>
            </li>
            <li>
              <Link href="/tasks">
                <div className="hover:text-gray-300">Задачи</div>
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/profile">
                  <div className="hover:text-gray-300">Профиль</div>
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/dashboard">
                  <div className="text-black hover:text-gray-300 hover:bg-black transition-all duration-300 ease-in bg-white px-4 py-2 rounded-full">
                    Прогресс
                  </div>
                </Link>
              </li>
            )}
            {session && (
              <li onClick={() => signOut()}>
                <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full transition duration-300">
                  Выйти
                </div>
              </li>
            )}
            {!session && (
              <li>
                <Link href="/login">
                  <div className="btn-base">Войти</div>
                </Link>
              </li>
            )}
            {!session && (
              <li>
                <Link href="/register">
                  <div className="btn-invers">Регистрация</div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
