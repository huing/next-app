import { people } from "../../../lib/person";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * https://www.nextjs.cn/docs/api-routes/dynamic-api-routes
 * */
export default function personHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log("[id]", req.query);
  const {
    query: { id },
  } = req;

  const filtered = people.filter(p => p.id === id);
  // User with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `User with id: ${id} not found.` });
  }
}
