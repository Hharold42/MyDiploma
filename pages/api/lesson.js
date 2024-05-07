import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (req.query.q === "ALL") {
        const lessons = await prisma.lesson.findMany();
        return res.status(200).json(lessons);
      }
      const id = req.query.q;
      const lesson = await prisma.lesson.findUnique({
        where: {
          id: Number(id),
        },
      });
      const attachedTasks = await prisma.task.findMany({
        where: {
          lessonId: Number(id),
        },
        select: {
          text: true,
          id: true,
        },
      });

      return res.status(200).json({ ...lesson, tasks: attachedTasks });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error while fetching lessons", error: error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
