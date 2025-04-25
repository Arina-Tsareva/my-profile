import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions); 

  if (req.method === "POST") {
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const { text, rating } = req.body;

    const comment = await prisma.comment.create({
      data: {
        author: session.user?.name || "Аноним",
        email: session.user?.email || "",
        image: session.user?.image || "",
        text,
        rating: parseInt(rating),
      },
    });

    return res.status(201).json(comment);
  }

  if (req.method === "GET") {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(comments);
  }

  res.status(405).json({ message: "Method not allowed" });
}
