import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { commentId, type } = req.body;

    console.log("Request body:", req.body);

    if (!commentId || !["like", "dislike"].includes(type)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        rating: type === "like" ? { increment: 1 } : { decrement: 1 },
      },
    });

    return res.status(200).json({ rating: comment.rating });

  } catch (error) {
    console.error("Server error in like-dislike:", error);
    return res.status(500).json({ message: "Server error", error: `${error}` });
  }
}
