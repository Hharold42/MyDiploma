const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    // Создаем пользователя с доступным автором
    const user = await prisma.user.create({
      data: {
        username: "author1",
        email: "author1@example.com",
        password: "password",
      },
    });

    console.log("Пользователь успешно создан");

    // Создаем уроки с lessonId от 1 до 5 и привязываем их к автору
    for (let i = 1; i <= 5; i++) {
      await prisma.lesson.create({
        data: {
          title: `Урок ${i}`,
          description: `Описание урока ${i}`,
          materials: ["Материал 1", "Материал 2"],
          difficulty: i,
          authorId: user.id,
        },
      });
    }

    console.log("Уроки успешно созданы");

    // Создаем задачи и привязываем их к урокам от 1 до 5 и автору
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 3; j++) {
        await prisma.task.create({
          data: {
            text: `Задача ${j} урока ${i}`,
            solution: `Решение задачи ${j} урока ${i}`,
            lessonId: i,
            difficulty: i,
            authorId: user.id,
          },
        });
      }
    }

    console.log("Задачи успешно созданы");
  } catch (error) {
    console.error("Ошибка при создании данных:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
