// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    name: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      : "secret key can not be read",
  });
}
