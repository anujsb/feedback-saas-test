import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "../../../lib/mongodb";
import { Form } from "../../../models/Form";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      await dbConnect();
      const { title, fields } = req.body;
      const form = new Form({ userId, title, fields });
      await form.save();
      res.status(201).json(form);
    } catch (error) {
      res.status(500).json({ error: "Error creating form" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
