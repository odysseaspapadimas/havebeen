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
  const place = req.body;

  if (session) {
    const newPlace = await Place.create(place);

    res.status(201).json(newPlace);
  }
}
