import { Model, ObjectId, Schema, model } from "mongoose";

export type TPlace = {
  _id: string;
  province: string;
  city: string;
  name: string;
  description: string;
  type: string;
  user: ObjectId;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  price: number;
};

interface Methods {}

const userSchema = new Schema<TPlace, {}, Methods>(
  {
    city: { type: String, required: true },
    province: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    facilities: [{ type: String, required: true }],
    imageUrls: [{ type: String, required: true }],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Place = model("Place", userSchema) as Model<TPlace, {}, Methods>;

export default Place;
