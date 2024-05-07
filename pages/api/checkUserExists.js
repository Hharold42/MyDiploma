import prisma from "@/prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      if (req.query.email) {
        const email = req.query.email;
        const login = req.query.login;

        const existingUserEmail = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!!existingUserEmail)
          return res
            .status(200)
            .json({ code: -1, message: "Такой email уже занят" });

        const existingUserLogin = await prisma.user.findFirst({
          where: {
            username: login,
          },
        });

        if (!!existingUserLogin)
          return res
            .status(200)
            .json({ code: -2, message: "Такой логин уже занят" });

        return res.status(200).json({ code: 1, message: "Доступно" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error checking user", error: error });
    }
  } else {
    return res.status(405).json({ message: "Unallowed method" });
  }
}
