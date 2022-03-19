import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import dbConnect from "../../../lib/dbConnect";
import { getSession } from "next-auth/react";
import Place from "../../../models/Place";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  await dbConnect();

  if (session?.user) {
    const places = await Place.find({ user: session.user.email });
    if (places) {
      res.status(200).json(places);
    } else {
      res.status(401).json({ msg: "No places found" });
    }
  }
}
