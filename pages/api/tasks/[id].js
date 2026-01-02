import clientPromise from "/../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("tasks");

  // ✅ GET single task
  if (req.method === "GET") {
    const task = await collection.findOne({ _id: new ObjectId(id) });
    return res.status(200).json(task);
  }

  // ✅ UPDATE task (THIS FIXES YOUR ISSUE)
  if (req.method === "PUT") {
    const { _id, ...updateData } = req.body; // ⛔ never update _id

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return res.status(200).json({ success: true });
  }

  // ✅ DELETE task
  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }

  // ❌ Block unsupported methods
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
