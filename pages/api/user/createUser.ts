import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { getSession } from "next-auth/react";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  await dbConnect();

  if (session?.user) {
    const user = await User.create({ email: session.user.email });
    if (user) {
      res.status(201).send(true);
    } else {
      res.status(401).send(false);
    }
  }
}
