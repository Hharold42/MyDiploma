import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (req.query.q === "ALL") {
        const lessons = await prisma.task.findMany();
        const lessonsModified = await Promise.all(
          lessons.map(async (item) => {
            console.log(item.lessonId);
            const authorName = await prisma.user
              .findUnique({
                where: {
                  id: item.authorId,
                },
                select: {
                  username: true,
                },
              })
              .then((res) => res.username);
            const lessonName = await prisma.lesson
              .findUnique({
                where: {
                  id: item.lessonId,
                },
                select: {
                  title: true,
                },
              })
              .then((res) => res.title);
            console.log(lessonName);
            return { ...item, authorName: authorName, lessonName: lessonName };
          })
        );

        return res.status(200).json(lessonsModified);
      }
      const id = req.query.q;
      const lesson = await prisma.task.findUnique({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(lesson);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error while fetching lessons", error: error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
