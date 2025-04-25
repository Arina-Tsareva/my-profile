import { NextApiRequest, NextApiResponse } from "next"; // типы для запросов и ответов в Next.js API
import { PrismaClient } from "@prisma/client"; //клиент для работы с базой данных через Prisma ORM. Он используется для выполнения запросов к базе данных

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const ratings = await prisma.rating.findMany();
    const average = ratings.length
      ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
      : 0;
    return res.status(200).json({ average });
  } else if (req.method === "POST") {
    const { rating } = req.body;
    await prisma.rating.create({ data: { value: parseInt(rating) } });
    return res.status(200).json({ message: "Rating saved successfully" });
  } else {
    res.status(405).end();
  }
}
