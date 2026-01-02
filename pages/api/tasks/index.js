import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("tasks");

  if (req.method === "GET") {
    const tasks = await collection.find({}).sort({ date: -1 }).toArray();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const task = {
      ...req.body,
      createdAt: new Date()
    };

    const result = await collection.insertOne(task);
    return res.status(201).json({ ...task, _id: result.insertedId });
  }

  res.status(405).end();
}
