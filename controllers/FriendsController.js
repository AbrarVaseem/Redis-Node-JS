import { createClient } from 'redis';
import connection from "../db.js";

const client = createClient(); // Redis Client

client.on('error', (err) => console.error('Redis Client Error', err)); // Redis Connection Failure

await client.connect();

// Simple Get Request
const getAllFriends = async (req, res) => {
  const cacheKey = 'friends-cache'; // Cache Key Name for this API
  try {
    const data = await client.get(cacheKey); // Get Data from Redis Cache
    if (data) {
      return res.status(200).json(JSON.parse(data)); // If Data Exists Returns Cached Data
    } else {
      const query = "SELECT * FROM friends";
      const result = await connection.query(query); // Else Hitting DB for Data
      await client.setEx(cacheKey, 3600, JSON.stringify({ status: 200, users: result.rows })); // Set the Data in Redis Cache
      return res.status(200).json({ status: 200, users: result.rows });
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllFriends };