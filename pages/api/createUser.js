import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const newUser = await prisma.user.create({
        data: {
          username: data.login,
          email: data.email,
          password: data.password,
        },
      });

      res.status(200).json(!!newUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating new user", error: error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
