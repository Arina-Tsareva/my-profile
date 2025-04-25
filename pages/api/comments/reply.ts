import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token || !token.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { parentId, text, rating } = req.body;

  try {
    const reply = await prisma.comment.create({
      data: {
        text,
        rating: parseInt(rating),
        parentId,
        author: token.name || "Аноним",
        email: token.email,
        image: token.picture || "",
      },
    });

    return res.status(201).json(reply);
  } catch (error) {
    console.error("Ошибка при создании ответа:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}
