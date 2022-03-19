import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    coords: {
      lat: Number,
      lng: Number,
    },
    user: String,
    date: String,
    description: String,
    name: String,
    country: String,
  },
  { versionKey: false }
);

export default mongoose.models.Place || mongoose.model("Place", PlaceSchema);
