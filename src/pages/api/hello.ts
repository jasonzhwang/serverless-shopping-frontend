// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    name: process.env.STRIPE_SECRET_KEY
      ? process.env.STRIPE_SECRET_KEY
      : "secret key can not be read",
  });
}
