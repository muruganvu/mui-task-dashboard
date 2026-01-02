import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("tasks");

    if (req.method === "GET") {
      const tasks = await collection.find({}).sort({ date: -1 }).toArray();
      return res.status(200).json(tasks);
    }

    if (req.method === "POST") {
      const result = await collection.insertOne(req.body);
      return res.status(201).json({ ...req.body, _id: result.insertedId });
    }

    res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
