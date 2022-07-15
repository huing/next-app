// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MenuData } from "../../types";

const data = [
  {
    id: 1,
    name: "菜单1",
    children: [
      {
        id: 11,
        name: "菜单11",
      },
      {
        id: 12,
        name: "菜单12",
      },
    ],
  },
  {
    id: 2,
    name: "菜单2",
  },
  {
    id: 3,
    name: "菜单3",
  },
];
export default function handler(req: NextApiRequest, res: NextApiResponse<MenuData[]>) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
  res.status(200).json(data);
}
