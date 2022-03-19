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

  const { id } = req.query;

  if (session) {
    const response = await Place.findByIdAndDelete({ _id: id });

    res.status(201).json(response);
  } else {
    res.status(401).json({ msg: "Unauthorized request." });
  }
}
