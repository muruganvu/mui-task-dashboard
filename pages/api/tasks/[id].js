import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("tasks");

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PUT") {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    return res.status(200).json({ success: true }); 
  }

  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
