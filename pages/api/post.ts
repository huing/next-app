// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPostData } from "../../lib/post";

type Data = {
  name: string;
} & any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { url },
  } = req;
  getPostData(url).then(data => {
    res.status(200).json(data);
  });
}

/* 或者写成这种 */
// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   const { query: { url }} = req;
//   const data = await getPostData(url);
//   res.status(200).json(data);
// }
