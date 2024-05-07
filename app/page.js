// Файл: pages/index.js
"use client";

import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Главная страница - Математический анализ</title>
        <meta
          name="description"
          content="Главная страница сайта для обучения математическому анализу"
        />
      </Head>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">
          Добро пожаловать на сайт по математическому анализу!
        </h1>
        <p className="text-lg mb-4">
          Здесь вы найдете уроки, задачи и другие материалы для изучения
          математического анализа.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Наши уроки</h2>
            <p>
              У нас есть широкий выбор уроков, покрывающих основные концепции
              математического анализа, начиная от дифференциального исчисления
              до интегрального исчисления.
            </p>
            <Link href="/lessons">
              <div className="text-blue-500 hover:underline mt-2 block">
                Перейти к урокам
              </div>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Наши задачи</h2>
            <p>
              Практика - ключ к пониманию математического анализа. У нас есть
              множество интересных и разнообразных задач для тренировки ваших
              навыков.
            </p>
            <Link href="/tasks">
              <div className="text-blue-500 hover:underline mt-2 block">
                Перейти к задачам
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Присоединяйтесь к нам!
          </h2>
          <p>
            Присоединяйтесь к нам сегодня и начните свое путешествие в мир
            математического анализа!
          </p>
          <Link href="/register">
            <div className="text-blue-500 hover:underline mt-2 inline-block">
              Зарегистрируйтесь сейчас
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
