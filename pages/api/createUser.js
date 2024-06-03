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

      const userProgress = await prisma.progress.create({
        data: {
          userId: newUser.id,
          limitAndContinuityLevel: 0,
          differentialCalculusLevel: 0,
          integralCalculusLevel: 0,
          seriesAndSequencesLevel: 0,
          multivariateAnalysisLevel: 0,
          differentialEquationsLevel: 0,
        },
      });

      await prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          progressId: userProgress.id,
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
