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
    const place = await Place.findOne({ _id: req.query.id });
    if (place) {
      res.status(200).json(place);
    } else {
      res.status(401).json({ msg: "No places found" });
    }
  }
}
