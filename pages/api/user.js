import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const result = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(result);
    } catch (e) {
      return res
        .status(500)
        .json({ error: 0, message: "Error while fetching user" });
    }
  }
}
